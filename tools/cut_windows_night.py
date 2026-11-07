# (Glen 11-07) his night windows (green screen sheet, bottom row): moon slit, dusk, moon arch, dark slit, stars
from PIL import Image; import numpy as np, sys
from scipy import ndimage
src='C:/Users/big_g/Desktop/david-sling-2-art/rooms/gibeah/tower_doors_windows_night_sheet.png'
a=np.asarray(Image.open(src).convert('RGBA')).astype(float); H,W=a.shape[:2]
r,g,b=a[...,0],a[...,1],a[...,2]
key=(g>r+45)&(g>b+45)
a[...,3][key]=0
edge=(g>r+15)&(g>b+15)&~key; a[...,1][edge]=np.maximum(a[...,0],a[...,2])[edge]   # (green spill on the edges)
names=['tw_win_slit_moon','tw_win_dusk','tw_win_arch_moon','tw_win_slit_night','tw_win_night']
SC=0.58
half=a[H//2:]; lab,n=ndimage.label(ndimage.binary_closing(half[...,3]>10,iterations=4))
sz=ndimage.sum(np.ones_like(lab),lab,range(1,n+1)); big=[j+1 for j in np.argsort(sz)[::-1][:5]]
boxes=sorted([ndimage.find_objects((lab==k).astype(int))[0] for k in big],key=lambda s:s[1].start)
ims=[]
for nm,(sy,sx) in zip(names,boxes):
    reg=half[sy,sx].copy(); m=(lab[sy,sx]>0); reg[...,3]*=m
    img=Image.fromarray(reg.clip(0,255).astype(np.uint8)); img=img.resize((round(img.width*SC),round(img.height*SC)),Image.LANCZOS)
    img.save(f'assets/rooms/gibeah/kit_tower/{nm}.png'); ims.append(img); print(nm,img.size)
c=Image.new('RGBA',(sum(i.width for i in ims)+100,max(i.height for i in ims)),(120,100,80,255)); x=0
for i in ims: c.alpha_composite(i,(x,0)); x+=i.width+20
c.save(sys.argv[1])
