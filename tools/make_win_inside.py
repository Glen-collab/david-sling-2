# (Glen 11-07) the palace window from outside: his moonlit arch, with the night sky inside swapped for warm lamplight
# (Michal's room seen from the balcony). A stand-in until Glen paints one.
from PIL import Image; import numpy as np, sys
from scipy import ndimage
a=np.asarray(Image.open('assets/rooms/gibeah/kit_tower/tw_win_arch_moon.png').convert('RGBA')).astype(float)
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
sky=(b>r+25)&(al>0)
sky=ndimage.binary_fill_holes(ndimage.binary_closing(sky,iterations=3))&(al>0)   # (the moon and stars too)
lab,n=ndimage.label(sky); sz=ndimage.sum(sky,lab,range(1,n+1)); sky=lab==(np.argmax(sz)+1)
ys,xs=np.where(sky); y0,y1=ys.min(),ys.max(); cx=xs.mean()
Y,X=np.mgrid[:a.shape[0],:a.shape[1]]
t=np.clip((Y-y0)/(y1-y0),0,1); d=np.clip(np.hypot((X-cx)/40,(Y-(y0+0.65*(y1-y0)))/60),0,1)
warm=np.stack([255-60*t, 190-80*t-40*d, 90-50*t-30*d],-1)*(1-0.35*d)[...,None]    # a lamp glowing low in the room
for k in range(3): a[...,k][sky]=warm[...,k][sky]
Image.fromarray(a.clip(0,255).astype(np.uint8)).save('assets/rooms/gibeah/kit_tower/tw_win_arch_lit.png')
Image.fromarray(a.clip(0,255).astype(np.uint8)).resize((330,448)).save(sys.argv[1])
