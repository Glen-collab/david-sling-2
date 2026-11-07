# (Glen 11-07) the feast table and cushions, the stone Ezel (green screen), the scroll shelf (on black)
from PIL import Image; import numpy as np, sys
from scipy import ndimage
A='C:/Users/big_g/Desktop/david-sling-2-art/rooms/ramah/'
def green(p):
    a=np.asarray(Image.open(A+p).convert('RGBA')).astype(float); r,g,b=a[...,0],a[...,1],a[...,2]
    m=g-np.maximum(r,b); a[...,3]=255*np.clip(1-(m-40)/60,0,1)
    sp=m>0; a[...,1][sp]=np.maximum(r,b)[sp]   # (green spill)
    return a
def crop(reg):
    ys,xs=np.nonzero(reg[...,3]>8); return reg[ys.min():ys.max()+1,xs.min():xs.max()+1]
def save(reg,folder,nm,sc):
    img=Image.fromarray(crop(reg).clip(0,255).astype(np.uint8)); img=img.resize((round(img.width*sc),round(img.height*sc)),Image.LANCZOS)
    img.save(f'assets/rooms/gibeah/{folder}/{nm}.png'); print(nm,img.size); return img
out=[]
# the table (with its bread, cup, lamp, figs) and the cushions: the pieces that don't touch
a=green('feast_table_sheet.png'); lab,n=ndimage.label(ndimage.binary_dilation(a[...,3]>60,iterations=3))
sz=ndimage.sum(np.ones_like(lab),lab,range(1,n+1)); big=[j+1 for j in np.argsort(sz)[::-1][:6] if sz[j]>3000]
for k in big:
    sy,sx=ndimage.find_objects((lab==k).astype(int))[0]; print('piece',sx.start,sy.start,sx.stop,sy.stop)
for k in big:
    sy,sx=ndimage.find_objects((lab==k).astype(int))[0]; reg=a.copy(); reg[...,3]*=(lab==k)
    if sy.start<500:   # the table and the stack of cushions at its right end touch: split them (the stack: right of 1462, below 800)
        yy,xx=np.mgrid[:a.shape[0],:a.shape[1]]; st=((xx>1462)&(yy>800))|((xx>1462)&(yy>740)&(a[...,0]>2.2*a[...,1]))
        t=reg.copy(); t[...,3]*=~st; out.append(save(t,'kit_halls','hall_table',0.25))
        continue   # (the stack runs off the picture's edge: not used)
    nm='hall_cushion_blue' if sx.stop<500 else 'hall_cushion_tan'
    out.append(save(reg,'kit_halls',nm,0.25))
out.append(save(green('stone_ezel.png'),'kit_fields','f_ezel',0.24))
# the shelf: on black (the gaps between the shelves are black too); a purple fringe
s=np.asarray(Image.open(A+'scroll_shelf.png').convert('RGBA')).astype(float); r,g,b=s[...,0],s[...,1],s[...,2]
mx=np.maximum(np.maximum(r,g),b); s[...,3]=255*np.clip((mx-14)/30,0,1)
pur=(b>g+12)&(r>g+12); s[...,2][pur]=g[pur]; s[...,0][pur]=np.minimum(r,g*1.5)[pur]   # (the purple edge -> wood brown)
s[...,3][pur&(mx<120)]*=0.3
out.append(save(s,'kit_halls','hall_scrolls',0.2))
c=Image.new('RGBA',(sum(i.width for i in out)+20*len(out),max(i.height for i in out)),(200,190,170,255)); x=0
for i in out: c.alpha_composite(i,(x,0)); x+=i.width+20
c.save(sys.argv[1])
