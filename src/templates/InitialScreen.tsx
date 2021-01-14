import React from 'react'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Mainimg from '../assets/img/page/家計簿_家計簿.png'
import LogoA from '../assets/img/page/money1.svg'
import LogoB from '../assets/img/page/money2.svg'
import LogoC from '../assets/img/page/money3.svg'
import "../assets/explanation/initial-screen.scss"

const InitialScreen = () => {
    const dispatch = useDispatch()

    return (
        <>
            <div className={"initial-screen__header"}>
                <div className={"initial-screen__header--sign-link"}>
                    <p onClick={() => dispatch(push('/login'))} className={"initial-screen__header--sign-link--sign-in"}>
                        <a>
                            ログイン
                        </a>
                    </p>
                    <p onClick={() => dispatch(push('/signup'))} className={"initial-screen__header--sign-link--sign-up"}>
                        <a>
                            新規アカウント作成
                        </a>
                    </p>
                </div>
                <img className="initial-screen__main-img" src={Mainimg} alt={'アプリ大見出し'} />
            </div>
            <div className={"initial-screen__description-content--wrapper"}>
                <div className={"initial-screen__content-wrp initial-screen__content-wrp--description"}>
                    <img className="initial-screen__logo initial-screen__description-content--image" src={LogoB} alt={'お金の出入り見える化'} />
                    <div className={"initial-screen__description-content--text"}>
                        <h2>
                            今月いくら使ったかを
                        <br />
                            カテゴリーごとに見える化
                        </h2>
                        <br />
                        <div className={"initial-screen__description-content--description"}>
                            毎日の支出を食費や日用品などに自動で分類!
                        <br />
                            何にお金を使っているのか今月あとどれくらい使えるのか、簡単に確認できます。
                        </div>
                    </div>
                </div>

                <div className={"initial-screen__content-wrp initial-screen__content-wrp--description"}>
                    <div className={"initial-screen__description-content--text"}>
                        <h2>
                            グループ機能で家族,恋人,シェアハウス
                        <br />
                            などグループ単位での収支を見える化
                        </h2>
                        <br />
                        <div className={"initial-screen__description-content--description"}>
                            グループ機能によって複数人の収支の一括管理を可能に!
                        <br />
                            家族,恋人,シェアハウスなどグループ単位での家計管理を簡単にできます。
                        </div>
                    </div>
                    <img className="initial-screen__logo initial-screen__description-content--image" src={LogoC} alt={'グループ機能'} />
                </div>

                <div className={"initial-screen__content-wrp initial-screen__content-wrp--description"}>
                    <img className="initial-screen__logo initial-screen__description-content--image" src={LogoA} alt={'テスト'} />
                    <div className={"initial-screen__description-content--text"}>
                        <h2>
                            会計機能で割り勘を簡単に!
                        <br />
                            グループでのお金のやり取りを見える化
                        </h2>
                        <br />
                        <div className={"initial-screen__description-content--description"}>
                            割り勘を行えるだけでなく支払,受取の確認も可能!
                        <br />
                            金額に変動がでないように会計した月の家計簿の追加,編集,削除を操作できないようにします。
                        </div>
                    </div>
                </div>

                <div className={"initial-screen__content-wrp"}>
                    <div className={"initial-screen__group-content"}>
                        <div className={"initial-screen__group-content--text"}>
                            <h2>
                                イチオシのグループ機能
                            </h2>
                            <br />
                                グループでの見える化、家計の管理や改善を簡単に行えます。
                        </div>
                                              
                    </div>
                </div>
            </div>
        </>
    )
}

export default InitialScreen