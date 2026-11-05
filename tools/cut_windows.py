from PIL import Image; import numpy as np, json, sys
from scipy import ndimage
src='C:/Users/big_g/Desktop/david-sling-2-art/rooms/gibeah/tower_doors_windows_sheet2.png'
a=np.asarray(Image.open(src).convert('RGBA')).astype(float); H,W=a.shape[:2]
frames=[(107,303,646,1059),(468,747,663,1018),(876,1163,634,1051),(1321,1519,646,1041),(1635,1989,657,1061)]
names=['tw_win_slit','tw_win','tw_win_arch','tw_win_slit_dark','tw_win_glow']
mids=[0]+[(frames[i][1]+frames[i+1][0])//2 for i in range(4)]+[W]
SC=0.48; out={}; ims=[]
for i,(fx0,fx1,fy0,fy1) in enumerate(frames):
    rx0,rx1=mids[i],mids[i+1]; oy=H//2
    reg=a[oy:,rx0:rx1].copy()
    r,g,b=reg[...,0],reg[...,1],reg[...,2]; lum=(r+g+b)/3
    inframe=np.zeros(lum.shape,bool); inframe[fy0-oy:fy1-oy, fx0-rx0:fx1-rx0]=True
    below=np.zeros(lum.shape,bool); below[fy1-oy-10:]=True
    reg[...,3][(lum<110)&below]=0                              # the rays' ragged dark ends
    reg[...,3][(g>r+6)&(g>b+70)&(lum>120)&~inframe]=0          # green-yellow flecks outside the frame
    reg[...,3][(g>r+6)&(g>b+70)&(lum>150)&inframe&(reg[...,3]<250)]=0
    reg[...,3][(b<0.5*g)&(g>150)&(g>r-25)]=0                    # lime-yellow drips (the light itself is cream)
    lab,n=ndimage.label(reg[...,3]>12); sz=ndimage.sum(np.ones_like(lab),lab,range(1,n+1))
    for j in np.where(sz<150)[0]: reg[...,3][lab==j+1]=0       # loose specks
    m=reg[...,3]>6; ys,xs=np.where(m)
    y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    fb=fy1-oy; L=y1-fb
    if L>20:
        t=np.clip((np.arange(reg.shape[0])-fb)/L,0,1); reg[...,3]*=((1-t)**1.6)[:,None]   # the rays fade out
    pad=6; y0=max(0,y0-pad); x0=max(0,x0-pad); y1=min(reg.shape[0],y1+pad); x1=min(reg.shape[1],x1+pad)
    img=Image.fromarray(reg[y0:y1,x0:x1].clip(0,255).astype(np.uint8))
    img=img.resize((round(img.width*SC),round(img.height*SC)),Image.LANCZOS)
    img.save(f'assets/rooms/gibeah/kit_tower/{names[i]}.png'); ims.append(img)
    l=fx0-(rx0+x0); t_=fy0-(oy+y0); rr=(rx0+x1)-fx1; bb=(oy+y1)-fy1
    out[names[i]]=dict(w=round((fx1-fx0)*SC),h=round((fy1-fy0)*SC),pad=[round(max(0,v)*SC) for v in (l,t_,rr,bb)])
    print(names[i],out[names[i]],img.size)
c=Image.new('RGBA',(sum(i.width for i in ims)+100,max(i.height for i in ims)),(120,100,80,255)); x=0
for i in ims: c.alpha_composite(i,(x,0)); x+=i.width+20
c.resize((c.width*2,c.height*2)).save(sys.argv[1])
