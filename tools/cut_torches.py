# (Glen 11-07) his torches (magenta sheet): on the wall, on a stone stand, a bowl; and the stand's torch alone, for Saul's men
from PIL import Image; import numpy as np, sys
from scipy import ndimage
src='C:/Users/big_g/Desktop/david-sling-2-art/rooms/gibeah/torches_sheet.png'
a=np.asarray(Image.open(src).convert('RGBA')).astype(float); H,W=a.shape[:2]
r,g,b=a[...,0],a[...,1],a[...,2]
m=np.minimum(r,b)-g                     # how magenta (255 the background, below 0 the art)
al=np.clip(1-(m-60)/130,0,1); a[...,3]=255*al
sp=m>-50; w=np.clip((m+50)/90,0,1)[sp]   # (magenta spill -> warm orange glow)
for ch,v in ((0,255),(1,150),(2,50)): a[...,ch][sp]=a[...,ch][sp]*(1-w)+v*w
lab,n=ndimage.label(ndimage.binary_dilation(a[...,3]>40,iterations=30))
sz=ndimage.sum(np.ones_like(lab),lab,range(1,n+1)); big=[j+1 for j in np.argsort(sz)[::-1][:3]]
boxes=sorted([ndimage.find_objects((lab==k).astype(int))[0] for k in big],key=lambda s:s[1].start)
SC=0.5; out={}
for nm,(sy,sx) in zip(['tw_torch_wall','tw_torch_stand','tw_torch_bowl'],boxes):
    reg=a[sy,sx].copy(); reg[...,3]*=(lab[sy,sx]>0)
    ys,xs=np.nonzero(reg[...,3]>8); reg=reg[ys.min():ys.max()+1,xs.min():xs.max()+1]
    out[nm]=reg
# the stand's torch without its stone base: cut above the first row much wider than the pole
s=out['tw_torch_stand']; op=(s[...,3]>128).sum(1); pole=np.median(op[int(len(op)*0.45):int(len(op)*0.65)])
cut=next(y for y in range(int(len(op)*0.5),len(op)) if op[y]>pole*2.2)-14
h=s[:cut].copy(); ys,xs=np.nonzero(h[...,3]>8); out['tw_torch_hand']=h[:,xs.min():xs.max()+1]
ims=[]
for nm,reg in out.items():
    img=Image.fromarray(reg.clip(0,255).astype(np.uint8)); img=img.resize((round(img.width*SC),round(img.height*SC)),Image.LANCZOS)
    img.save(f'assets/rooms/gibeah/kit_tower/{nm}.png'); ims.append(img); print(nm,img.size)
c=Image.new('RGBA',(sum(i.width for i in ims)+100,max(i.height for i in ims)),(40,40,70,255)); x=0
for i in ims: c.alpha_composite(i,(x,0)); x+=i.width+20
c.save(sys.argv[1])
