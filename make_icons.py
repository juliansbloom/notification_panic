"""Generate Notification Panic app icons as PNGs using only stdlib."""
import struct, zlib, math

# ── PNG encoder ──────────────────────────────────────────────────────────────

def make_chunk(tag, data):
    crc = zlib.crc32(tag + data) & 0xFFFFFFFF
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', crc)

def encode_png(w, h, pixels):
    """pixels: list of (r,g,b,a) rows, row-major."""
    raw = b''.join(
        b'\x00' + bytes([v for px in row for v in px])
        for row in pixels
    )
    ihdr = make_chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    idat = make_chunk(b'IDAT', zlib.compress(raw, 9))
    iend = make_chunk(b'IEND', b'')
    return b'\x89PNG\r\n\x1a\n' + ihdr + idat + iend

# ── Drawing helpers ───────────────────────────────────────────────────────────

def sdf_rounded_rect(px, py, x, y, w, h, r):
    """Signed distance — negative = inside, positive = outside."""
    dx = max(x - px, 0, px - (x + w))
    dy = max(y - py, 0, py - (y + h))
    corner_x = max(x + r - px, 0, px - (x + w - r))
    corner_y = max(y + r - py, 0, py - (y + h - r))
    # distance from the inner rect minus the corner radius
    qx = abs(px - (x + w/2)) - w/2 + r
    qy = abs(py - (y + h/2)) - h/2 + r
    return math.sqrt(max(qx,0)**2 + max(qy,0)**2) - r

def alpha_for_sdf(d, aa=1.2):
    """Convert SDF distance to alpha (0..255)."""
    return max(0, min(255, int(255 * (1 - (d + 0.5) / aa))))

def lerp(a, b, t):
    return a + (b - a) * t

def lerp_rgb(c1, c2, t):
    return tuple(int(lerp(c1[i], c2[i], t)) for i in range(3))

def blend(bg, fg, a):
    """Alpha-blend fg over bg (a = 0..255)."""
    t = a / 255
    return tuple(int(bg[i] * (1-t) + fg[i] * t) for i in range(3))

# ── Icon painter ──────────────────────────────────────────────────────────────
# Color palette  (matches CSS vars)
C_BG1    = (26,  14,  56)    # top gradient
C_BG2    = (12,  12,  18)    # bottom gradient
C_SURF   = (24,  24,  36)    # phone body
C_SCREEN = (12,  12,  18)    # screen bg
C_ACCENT = (124, 95, 244)    # purple
C_GOOD   = (38, 222, 129)    # green
C_BAD    = (255, 71,  87)    # red
C_SOCIAL = (255, 107, 157)   # pink
C_REP    = (255, 165,  2)    # orange

def draw_icon(size):
    s  = size
    px = []

    # Phone geometry (relative to size)
    ph_x = s * 0.22
    ph_y = s * 0.10
    ph_w = s * 0.56
    ph_h = s * 0.80
    ph_r = s * 0.07

    sc_pad = s * 0.055
    sc_x   = ph_x + sc_pad
    sc_y   = ph_y + s * 0.10
    sc_w   = ph_w - sc_pad * 2
    sc_h   = ph_h - s * 0.18

    # 3 notification cards
    card_margin = s * 0.03
    card_x      = sc_x + card_margin
    card_w      = sc_w - card_margin * 2
    card_h      = s * 0.10
    card_r      = s * 0.018
    card_gap    = s * 0.035

    cards = [
        (sc_y + s * 0.04,                    C_SOCIAL),
        (sc_y + s * 0.04 + card_h + card_gap, C_BAD),
        (sc_y + s * 0.04 + (card_h + card_gap)*2, C_ACCENT),
    ]

    # Arrows row  y-center
    arrow_y  = sc_y + sc_h * 0.76
    arrow_th = s * 0.032
    center_x = sc_x + sc_w / 2

    # Background corner radius (20% = maskable icon safe zone)
    bg_r = s * 0.22

    for y in range(s):
        row = []
        for x in range(s):
            # ── background ──────────────────────────────────────────
            d_bg = sdf_rounded_rect(x, y, 0, 0, s, s, bg_r)
            if d_bg > 1.5:
                row.append((0, 0, 0, 0))
                continue

            t_grad   = y / s
            bg_color = lerp_rgb(C_BG1, C_BG2, t_grad)
            bg_alpha = alpha_for_sdf(d_bg)

            base = bg_color  # rgb accumulator

            # ── phone body ───────────────────────────────────────────
            d_ph = sdf_rounded_rect(x, y, ph_x, ph_y, ph_w, ph_h, ph_r)
            if d_ph <= 1.5:
                a_ph = alpha_for_sdf(d_ph)
                base = blend(base, C_SURF, a_ph)

                # phone border (accent glow)
                border_w = s * 0.028
                if d_ph > -border_w:
                    t_border = max(0, min(1, (-d_ph) / border_w))
                    base = blend(base, C_ACCENT, int(t_border * 220))

                # ── screen ───────────────────────────────────────────
                d_sc = sdf_rounded_rect(x, y, sc_x, sc_y, sc_w, sc_h, s * 0.025)
                if d_sc <= 1.5:
                    a_sc = alpha_for_sdf(d_sc)
                    base = blend(base, C_SCREEN, a_sc)

                    # ── notification cards ───────────────────────────
                    for (cy, color) in cards:
                        d_card = sdf_rounded_rect(x, y, card_x, cy, card_w, card_h, card_r)
                        if d_card <= 1.5:
                            a_card = alpha_for_sdf(d_card)
                            # dot on left side of card
                            dot_cx = card_x + card_h * 0.42
                            dot_cy = cy + card_h / 2
                            dot_r  = card_h * 0.28
                            d_dot  = math.sqrt((x - dot_cx)**2 + (y - dot_cy)**2) - dot_r
                            dot_alpha = alpha_for_sdf(d_dot)
                            card_color = blend(C_SURF, color, 200)
                            base = blend(base, card_color, a_card)
                            if dot_alpha > 0:
                                base = blend(base, color, dot_alpha)
                            break

                    # ── swipe arrows ─────────────────────────────────
                    if abs(y - arrow_y) < arrow_th:
                        # left arrow bar
                        if sc_x + s*0.04 <= x <= center_x - s*0.06:
                            progress = 1 - (x - sc_x - s*0.04) / (center_x - s*0.1 - sc_x)
                            a_arrow = int(200 * (0.3 + 0.7 * progress))
                            base = blend(base, C_BAD, a_arrow)
                        # right arrow bar
                        if center_x + s*0.06 <= x <= sc_x + sc_w - s*0.04:
                            progress = (x - center_x - s*0.06) / (sc_w - s*0.1 - s*0.06)
                            a_arrow = int(200 * (0.3 + 0.7 * progress))
                            base = blend(base, C_GOOD, a_arrow)

            row.append((*base, bg_alpha))
        px.append(row)
    return px

# ── Generate icons ────────────────────────────────────────────────────────────
for size in [192, 512]:
    pixels = draw_icon(size)
    data   = encode_png(size, size, pixels)
    path   = f'icons/icon-{size}.png'
    with open(path, 'wb') as f:
        f.write(data)
    print(f'✓  {path}  ({len(data):,} bytes)')
