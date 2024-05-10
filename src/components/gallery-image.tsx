import { blurHashToDataURL } from "@/utils/blurhashDataURL";
import Image, { ImageLoaderProps } from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  loadImage: (args: ImageLoaderProps) => string;
  src: string;
  alt: string;
}

const defaultDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQK0lEQVR4AQEgEN/vAOXk4v/l5OL/5eTi/+Tj4f/k4+H/5OPh/+Tj4P/k4uD/5OLg/+Ti3//k4t//4+Hf/+Ph3//j4d//4+Hf/+Ph3//j4d//4uHf/+Li3//i4t//4uLf/+Li3//i4t//4uLf/+Li3//i4t//4+Lf/+Pi3//j4t//4+Le/+Pi3v/j4t7/AOXk4v/l5OL/5eTi/+Tj4f/k4+H/5OPh/+Tj4P/k4uD/5OLg/+Ti3//j4d//4+Hf/+Ph3//j4d7/4+He/+Ph3v/i4d//4uHf/+Lh3//i4t//4uLf/+Li3//i4t//4uLf/+Li3//i4t//4+Lf/+Pi3//j4t//4+Le/+Pi3v/j4d7/AOXk4v/l5OL/5ePi/+Tj4f/k4+H/5OPg/+Ti4P/k4t//5OLf/+Ph3//j4d7/4+He/+Ph3v/j4d7/4uHe/+Lh3v/i4d7/4uHe/+Lh3v/i4d7/4uHf/+Lh3//i4t//4uLf/+Li3//i4t//4uLf/+Pi3v/j4d7/4+He/+Ph3v/j4d7/AOXj4v/l4+L/5OPh/+Tj4f/k4+H/5OLg/+Ti3//k4d//4+He/+Pg3v/j4N3/4+Dd/+Lg3f/i4Nz/4uDc/+Lg3P/i4N3/4uDd/+Lg3f/i4d7/4uHe/+Lh3v/i4d7/4uHe/+Lh3v/i4d7/4uHe/+Lh3v/j4d7/4+He/+Ph3v/j4d7/AOXj4v/k4+L/5OPh/+Tj4f/k4uD/5OLf/+Ph3//j4d7/4+Dd/+Pf3P/i39z/4t/b/+Le2//h3tv/4d7b/+Hf2//h39v/4d/c/+Hf3P/h4Nz/4eDd/+Hg3f/h4d3/4uHe/+Lh3v/i4d7/4uHe/+Lh3v/i4d7/4+He/+Ph3v/j4d7/AOTj4v/k4+L/5OPh/+Ti4f/k4uD/4+Hf/+Pg3v/j4N3/4t/b/+Le2v/h3tr/4d3Z/+Hd2f/h3dj/4N3Z/+Dd2f/g3dn/4N7a/+De2v/g39v/4d/c/+Hg3P/h4N3/4eDd/+Hg3f/i4N3/4uDd/+Lg3f/i4N3/4uDd/+Lg3f/j4N3/AOTj4v/k4+L/5OLh/+Ti4P/k4d//4+De/+Pf3f/i3tv/4t3a/+Hd2P/h3Nf/4NvX/+Db1v/g29b/39vW/9/b1v/f3Nf/39zY/+Dd2f/g3tn/4N7a/+Df2//h39z/4d/c/+Hg3P/h4N3/4uDd/+Lg3f/i4N3/4uDd/+Lf3f/i393/AOTj4v/k4uH/5OLh/+Th4P/j4N//49/d/+Le2//h3dr/4dzY/+Db1v/g2tX/39rU/9/Z0//f2dP/3tnT/97a1P/e2tT/3tvV/9/b1v/f3Nj/393Z/+De2v/g3tr/4N/b/+Hf3P/h39z/4d/c/+Lf3P/i39z/4t/c/+Lf3P/i39z/AOTi4v/k4uH/5OLh/+Ph3//j4N7/4t7c/+Ld2v/h3Nj/4NrW/9/Z1P/f2NL/3tjR/97X0P/d19D/3dfQ/93Y0f/d2NL/3dnT/97a1P/e29b/39zX/9/c2P/f3dn/4N7a/+De2//h3tv/4d7c/+He3P/i3tz/4t7c/+Le3P/i3tv/AOTi4f/k4uH/5OHg/+Pg3//j393/4t3b/+Hc2f/g2tb/39nU/97X0v/e1tD/3dXO/9zVzf/c1c3/3NXN/9zWzv/c1s//3NfR/93Y0v/d2dT/3trV/97b1//f3Nj/393Z/+Dd2v/g3dr/4d7b/+He2//h3tv/4d3b/+Ld2//i3dv/AOTh4f/k4eH/4+Hg/+Pg3v/i3tz/4d3a/+Db1//f2dT/3tfS/93Wz//d1M3/3NPL/9vTyv/b08r/29PK/9vUy//b1Mz/29bO/9zX0P/c2NL/3dnU/97a1f/e29f/39zY/9/c2f/g3dr/4N3a/+Hd2v/h3dr/4d3a/+Hd2v/h3Nr/AOTh4f/k4eH/4+Dg/+Pf3v/i3dz/4dzZ/+Da1v/f2NP/3dbQ/9zUzf/b0sr/29HJ/9rRyP/a0cf/2tHH/9rSyP/a08r/2tTM/9vVzv/b19D/3NjS/93Z1P/e2tb/3tvX/9/c2P/f3Nn/4NzZ/+Dc2v/g3Nr/4dza/+Hc2v/h3Nr/AOPh4f/j4OD/49/f/+Le3f/h3dv/4NvY/9/Y1P/e1tH/3dTO/9vSy//a0cj/2tDG/9nPxf/Zz8T/2M/F/9nQxv/Z0cj/2dLK/9rUzP/b1c7/29fR/9zY0//d2dX/3trW/97b1//f29j/39vZ/+Db2f/g29n/4NvZ/+Db2f/h29n/AOPg4P/j4OD/4t/f/+Le3f/h3Nr/4NrX/97X0//d1dD/3NPM/9vRyf/az8b/2c7E/9jNw//YzcL/187D/9jOxP/Y0MX/2NHI/9nTyv/a1M3/29bP/9zX0v/c2NT/3dnV/97a1v/e2tf/39vY/9/b2P/g29j/4NrY/+Da2P/g2tj/AOPg4P/j3+D/4t7e/+Hd3P/g29n/39nW/97X0v/c1M7/29LL/9rQx//ZzsT/2M3C/9fMwf/XzMD/18zB/9fNwv/XzsT/2NDG/9jSyf/Z08z/2tXO/9vW0f/c2NP/3dnU/93Z1v/e2tf/39rX/9/a2P/f2tj/39rY/+Da2P/g2tj/AOLf4P/i39//4t7e/+Hc3P/g2tn/39jV/93W0f/c083/2tHK/9nPxv/YzcP/18zB/9bLv//Wy7//1su//9bMwf/WzcP/18/F/9jRyP/Z08v/2tTN/9vW0P/b19L/3NjU/93Z1f/e2db/3tnX/97a1//f2df/39nX/9/Z1//f2df/AOLe3//i3t//4d3d/+Dc2//f2tj/3tjV/93V0f/b083/2tDJ/9jOxf/XzML/1svA/9bKvv/Vyr7/1cu//9bLwP/WzcL/18/E/9fQx//Y0sr/2dTN/9rVz//b19L/3NjT/93Y1f/d2db/3tnW/97Z1//e2df/39nX/9/Z1//f2Nf/AOHe3//h3t7/4d3d/+Db2//f2dj/3tfU/9zV0P/b0sz/2dDI/9jOxf/XzML/1svA/9XKvv/Vyr7/1cq+/9XLwP/WzcL/1s7E/9fQx//Y0sr/2dTN/9rVz//b1tH/3NfT/9zY1P/d2NX/3dnW/97Z1v/e2Nb/3tjW/97Y1v/e2Nb/AOHd3v/h3d3/4Nzc/9/b2v/e2df/3dfU/9zU0P/a0sz/2dDI/9jNxf/XzML/1svA/9XKv//Vyr7/1cq//9XLwP/WzcL/1s7E/9fQx//Y0sr/2dTN/9rVz//b1tH/29fT/9zY1P/d2NX/3djW/93Y1v/d2Nb/3tjW/97Y1v/e2Nb/AODd3f/g3d3/4Nzc/9/a2v/e2df/3dbU/9vU0P/a0sz/2dDJ/9fOxf/WzMP/1svB/9XKv//Vyr//1cvA/9XMwf/WzcP/1s/F/9fQyP/Y0sr/2dTN/9rVz//a1tH/29fT/9zY1P/c2NX/3djV/93Y1v/d2Nb/3djW/93X1f/d19X/AODc3f/f3Nz/39vb/97a2f/d2Nf/3NbT/9vU0P/a0s3/2NDJ/9fOxv/WzcT/1szC/9XLwf/Vy8H/1czB/9XNwv/WzsT/1s/G/9fRyf/Y0sv/2dTO/9rV0P/a1tL/29fT/9zY1P/c2NX/3NjV/9zY1f/d2NX/3djV/93X1f/d19X/AN/c3P/f3Nz/3tva/97a2f/d2Nb/3NbU/9vU0P/Z0s3/2NDK/9fPx//WzcX/1s3E/9XMw//VzML/1c3D/9bOxP/Wz8b/19DI/9fSyv/Y08z/2dTO/9rW0P/a19L/29fT/9vY1P/c2NX/3NjV/9zY1f/c2NX/3NfV/9zX1f/c19X/AN7b2//e29v/3tra/93Z2P/c2Nb/29bU/9rV0f/Z087/2NHL/9fQyf/Xz8f/1s7F/9bNxf/WzcX/1s7F/9bPxv/X0Mj/19HJ/9jTy//Z1M3/2dXP/9rW0f/a19P/29jU/9vY1f/c2NX/3NjV/9zY1f/c2NX/3NfV/9zX1f/c19X/AN7b2v/e29r/3drZ/93Z2P/c2Nb/29fU/9rV0f/Z08//2NLN/9fRy//X0Mn/1s/I/9bPx//Wz8f/1s/H/9fQyP/X0cr/2NLL/9jUzf/Z1c//2tbR/9rX0v/b19P/29jU/9vY1f/b2NX/29jV/9vY1f/b2NX/29fV/9vX1f/b19X/AN3a2v/d2tr/3drZ/9zZ2P/c2Nb/29fU/9rV0v/Z1ND/2NPO/9jSzP/X0cv/19DK/9fQyf/X0Mn/19HK/9fSy//Y08z/2NTN/9nVz//Z1tD/2tfS/9rX0//b2NT/29jV/9vY1f/b2dX/29jV/9vY1f/b2NX/29jV/9vX1f/b19X/AN3a2f/c2tn/3NrY/9zZ1//b2Nb/29fU/9rW0//Z1dH/2NTP/9jTzv/Y0s3/19LM/9fSzP/X0sz/19LM/9jTzf/Y1M7/2dXP/9nW0f/a19L/2tfT/9vY1P/b2NX/29nV/9vZ1v/b2db/29nW/9vY1f/b2NX/29jV/9rX1f/a19T/ANza2f/c2tj/3NnY/9vZ1//b2Nb/2tfV/9rW0//Z1dL/2dXR/9jU0P/Y1M//2NPO/9jTzv/Y1M7/2NTP/9jVz//Z1dD/2dbR/9rX0v/a19P/29jU/9vZ1f/b2dX/29nW/9vZ1v/b2db/29nW/9vY1f/a2NX/2tjV/9rY1f/a19T/ANzZ2P/b2dj/29nX/9vZ1//b2Nb/2tfV/9rX1P/Z1tP/2dbS/9jV0f/Y1dH/2NXQ/9jV0P/Y1dD/2dXR/9nW0f/Z1tL/2tfT/9rY1P/b2NT/29nV/9vZ1v/b2db/29nW/9vZ1v/b2db/29nW/9rZ1v/a2NX/2tjV/9rY1f/a2NT/ANvZ2P/b2df/29nX/9vZ1//a2Nb/2tjV/9rX1f/Z19T/2dbT/9nW0//Z1tL/2dbS/9nW0v/Z1tL/2dfT/9nX0//a2NT/2tjU/9vZ1f/b2db/29nW/9va1v/b2tf/29rX/9va1//b2db/29nW/9rZ1v/a2NX/2tjV/9nY1f/Z2NT/ANvZ1//b2df/29nX/9rZ1//a2Nb/2tjW/9rY1f/Z19T/2dfU/9nX1P/Z19P/2dfT/9nX0//Z19T/2tjU/9rY1f/a2NX/29nW/9vZ1v/b2tf/29rX/9za1//c2tf/29rX/9va1//b2tf/29nW/9rZ1v/a2dX/2djV/9nY1f/Z2NX/ANvZ1//b2df/2tnX/9rZ1v/a2Nb/2tjW/9rY1f/Z2NX/2dfV/9nX1f/Z19T/2dfU/9nY1f/a2NX/2tjV/9rZ1v/b2db/29rX/9va1//c2tf/3NrX/9za2P/c2tj/29rX/9va1//b2tf/2tnW/9rZ1v/a2dX/2djV/9nY1f/Z2NX/ANrZ1//a2df/2tnX/9rZ1v/a2Nb/2tjW/9rY1v/Z2NX/2djV/9nY1f/Z2NX/2djV/9nY1f/a2Nb/2tnW/9rZ1v/b2tf/29rX/9va1//c2tj/3NvY/9zb2P/c29j/3NrY/9va1//b2tf/2tnW/9rZ1v/a2dX/2djV/9nY1f/Z2NX/OcAp1wUFaQoAAAAASUVORK5CYII="
const GalleryImage = (props: Props) => {
  const { loadImage, src, alt } = props;

  const check = process.env.NEXT_PUBLIC_ENV === "dev";
  const [blur, setBlur] = useState(defaultDataURL);

  const loadImageProp = {
    loader: loadImage,
  };

  useEffect(() => {
    const blurDataURL = async () => {
      if (check) return null;

      const blurhash = `${window.location.hostname}/.netlify/images?url=${src}&fm=blurhash`;
      const fetcher = await fetch(blurhash);
      const hash = await fetcher.text();
      const calculatedDataURL = blurHashToDataURL(hash) as string;

      return calculatedDataURL;
    };

    // too slow to be rendered in prod
    blurDataURL().then((res) => {
      if (res !== null) setBlur(res)
    });
  }, [check, src])

  return (
    <div>
      <Image
        {...(!check && loadImageProp)}
        src={src}
        alt={alt}
        width={280}
        height={280}
        placeholder="blur"
        blurDataURL={blur}
        quality={100}
        style={{
          width: 280,
          height: 280,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default GalleryImage;
