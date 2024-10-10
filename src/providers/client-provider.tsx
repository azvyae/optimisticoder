'use client';

import Cookies from 'js-cookie';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const nprogressStyle = `
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: rgb(144 188 125);

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow:
    0 0 10px rgb(114 151 98),
    0 0 5px rgb(114 151 98);
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}
`;
function ClientProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const tz = Cookies.get('tz');
    if (!tz) {
      Cookies.set('tz', Intl.DateTimeFormat().resolvedOptions().timeZone, {
        expires: 1,
      });
    }
  }, [pathname]);
  return (
    <>
      <ProgressBar
        height="4px"
        options={{
          showSpinner: false,
          easing: 'ease',
          speed: 1500,
        }}
        style={nprogressStyle}
        shallowRouting
      />
    </>
  );
}

export { ClientProvider };
