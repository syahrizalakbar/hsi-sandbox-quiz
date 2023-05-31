import React, { memo } from 'react'
import Image from 'next/image'
import style from '@/styles/Appbar.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';

function Appbar({ sortActive, showMenu = true, ...rest }) {
    const router = useRouter();

    function sort(path) {
        router.push(`/?sort=${path}`);
    }

    return <div {...rest} className={style.appbar} >
        {
            showMenu &&
            <div className={style.menu}>
                <button onClick={() => sort('new')} className={sortActive == 'new' ? style.buttonActive : undefined}>New</button>
                <button onClick={() => sort('popular')} className={sortActive == 'popular' ? style.buttonActive : undefined}>Popular</button>
            </div>
        }

        <Link href='/'> <Image src='/logo.png' alt='logo' width={99} height={29} /></Link>
    </div>

}

export default memo(Appbar)