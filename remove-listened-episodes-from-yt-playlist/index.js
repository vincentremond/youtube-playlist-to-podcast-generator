const { Builder, By, Key, Capabilities, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw";
const videosToRemove = ["U8m9Fcx3zdE","ckGAZ1jcqZE","tTwDKyybF3g","s5WybLGLxwI","JRVSDKtdkgU","aAZmmzUXBkc","zDJFwPt8750","pJRTzvDAhW0","JweDDhD1tv4","FipHgq9Ufkc","b-Iime4gYKI","2IrLhPpgThY","uYwQkKVK-LQ","6DlQhEoQg0s","io-njOt3HL0","AziZUeQF2B0","obTyNhLarwE","5hlu-UhH3x0","DA8jE1XDOEY","9N2siCXVb8Q","U90WfAKGzG8","YE41BLOAQk0","Vn8ltYPOgK0","3eKpKyDrXM4","8GAO9sDU-zA","RouWhR8Aby8","tXkMBRsbwz4","xFoQOTkThYc","zpAhFew1Juw","dNChMAebjog","JSFx5iF_1AU","1HSgj2WnDk4","gJH6z9n5dI4","LiZzCJ9aUMU","YtV7DKC-cAg","sbqIFM22Zkg","BzfEwwamxmU","fH14oI_PJAQ","XJVWQat2ZBU","YgNRIPvTkNQ","RPXcwNbomJo","Agvbj3cPsBM","9-cxaG1kdrI","UlVUDhkdMM8","kX6wJ6P8vhE","SuxHM0OI39I","RWUPFLu9MwM","od4uIFkN8Ak","ZbJawZuWn9g","N_G96h4eNlU","_AjgWaWz7dU","k0Lslr1t27k","2cwFSY9fik0","Y7OUzFwYgL8","zcdxEm5DP84","IaBY1MYBh2o","-_kmE-addHc","A58AjS_26dk","h3Y6gCrxhGo","Fj5f1rPOxNY","Xbh2ojqD8Bw","pdfEQt7_70w","WK3u-coiYXA","ULn5NCkVu1Y","GioJt_Ed7ko","G4IZe0_sRy0","2IgeUY3voYA","3uPYLHqn9Pk","p3phJmZwpTI","puPhNc033gA","PBR0O_F5Ff8","2EMRFfCVamM","98vV-eHFWY0","XNRss22z5OE","Fho0ydjD4II","7at6iGwrPHs","_9QXrE3rZ0s","3IYetFi8Xn4","DQUPbOiDflI","FXkn3JJzyNY","NQZExMHDecY","crHtEMcx_Pc","Xs6PwydQIag","_kBFg_Nti9c","mEaJuoml0oU","Y1PDiBea8oM","gaBQcY7H0Lc","lw3tuB4pMVM","8aU3KDEOc2M","pisxvxwNJRk","JXaZBAoLvgM","dvlhMeT3XhA","fVpWfdcySGE","XjWII5OQtQg","EPtCmoRfGdQ","EOWeewlc2CE","oInahcGc8Og","VFIy_FAxas0","Dq-nC50EzU8","PMZ63orAn7w","LJp_QRDXn5Q","sZ42bMkjGTY","hC9ydLnQCmE","cWWUP60bqqE","t59mtHAWcOc","WZv_rozpEQc","EjqOctRGB7w","wuKgiSLtS-Y","3vg9kffxPtE","Opq37mJ_D4s","86IqLbDrs50","MDI7KlVEXYM","4G47xLCdOrE","Wexs26BWUnk","1rgjUGtUyp0","WREQ0QXfDgw","KHI_x-JB-nk","JnW5SEhcDIg","CJ1NwaoDpx8","08vgPjkMH0U","R3-2DQOAB4E","zJuHS-_jMRs","-eA9geTpV-g","e64UIXla1bY","_m-Ws1esu0w","JFeKXFTo7As","AAOuk0RoKkw","4a6HCDPMHac","kr9s9uSQIEo","AxC613O3RGs","nonOdt2xQ58","Om-2T70xvf0","ko_BtmQdIHU","W6An5aldd6A","fuYIazCKPZE","vJr1PWWvccQ","Kx9U6gfm1w8","Dwt0zC0tcwg","12O_cYz4CdU","McA4TA4f2bE","jrainhoprh8","RzeDkMnDdKA","I3hBt7pRemk","JLvblA_lqdc","rlFSDwpKORo","dy2U8rpAVAc","wyd2FF0ONUc","JNeA6FeMAmA","uhtTEx_Mtlw","qgE58VG9VsM","bZzZ2t3kr_Y","ZE33zTVp2dM","kUDFKSGLyfg","xl66TCzKdNE","l8c9w0OqrvI","Tx1nfCbjhlY","JTx7f3Iv_ig","rfRYDg05uCY","w_TzIvjFAXM","Pyb_esTSEa0","wBBcUZMAgFQ","qMOIBZPsVug","zjaUqUozwdc","HeTbkuyY6tw","RC_6xvYPMG0","M3bpo6Lu-os","tEWr0F9KLqI","e02Ev40Uus0","tKcbrv8Sca0","mmzV5CDX4PU","OqksLsC96Co","tDbSWase3Gs","6aGfiE0YU-U","kpbQhlrrmoY","5ZkOQCJgqo0","uzQQYWqTodc","tjm9O0e5IiY","k0gRvDNiKUE","AB-e4e20ynQ","Rzc1Vo8KrXU","hCl3WVig9S4","-ugAsvDcf2A","_pm5YaHgXQo","_jLUcp25N6s","7OhOqNjWM_Q","5RKWt4PhCHg","kY5dni2vbVc","-gh4GexvYMY","0kJwpwIJt7o","0Ex9hxPT3l0","lLUMgH-r5FA","RFOdWmt6ztY","QVyr0fl6E9c","a12C1X6rqNc","i89W-pt4L7Y","5F7OP5T1pMM","NDxC6Bl1wpU","HNj8IiO0Su0","S0VRQFb16O0","myvqqWSLDew","rXRigNaJgMM","EtCHzpXm_LU","cEBorOW9k_w","6AX8TPaNYQ0","aaUXRHNII1w","UOxNlGVMm6g","DLjXsvG8_aY","MbFocyMizSs","48xsvbAYFGA","TG7yWNvuwYw","r0H3CqFd3QM","d9kvCSF6Lwk","szET4BrPALM","kNPGzO8RIxc","f8mgAE6q060","1lsU0wi-PHg","VEcCGOyCe5w","2AxiUfL7e_g","gAwnOow1Cc0","_Q0RP_DNcPQ","L0V41IdoNnU","sMzqDUeY8wA","LWitr0qp_r8","Qlsfs0d56IU","_FY1krSq3lw","7yz8UsTLYPw","fJBOz9FGFkA","YBXkkgbPSPI","Ijkm27UdsXU","VGk9YsFHQso","vwAyv8hKDC4","22cfnZ16dus","Qu8Z3p3QmW8","mcxpXuFqU_s","Tf-KWCrWACg","z1nz32z7nR8","xukQfYeB3yU","-fh8L1o7was","H5KC7yebJQs","-TEDl-Fxetc","jWbss21CI2A","t9Kk0-AqD64","l4qD3J2FIeY","PLRubocBHco","RdM--h_XwXo","56BdrxJkj4M","uBKb2WOqEnw","BLYJFIX6mFw","dj2GhofMm1o","DhtIvWS9v5E","xc7YucoUpQI","qEliqXEE_6Y","Jz2xmW1SNS0","SS79l8F3HT0","TfZLIPwMYUc","I0GImBIkA7Y","uEMG5gMfWKs","iH8OCpty4t8","yI3oKjB3a3c","FYr2M60gCwk","kWa_t6nqcsg","U8j8fYKng0w","ZYjI0DzrJ4k","NE2Opjh-0QE","TjtuqWwVHdU","0k6ZWV-AT4Q","pL_vZ4qUK0A","wSRwwvoqVJQ","KR2nLuHOMQw","PFYlKDsqlkU","VDyHq4Stplk","9AcvAVlqpqs","mz1O3Z2k4JY","LkArfCNhzqQ","7vgzBlEd3D8","HIPwzSF1vR0","XecHAJhCpkY","h7CJjr3m6So","Ql7gzkt8cr0","gS0OAGzW7LM","4DmZ8DU5H9k","SqXAtikBebE","ZgCg29tbgHU","IaOJJkjmO5c","rA68XTX9b5Q","c09kEUUv4xw","0Mtd8bYaZzY","n7tdjZYCzEo","XmAqZ_0kABo","UmrqEW-U1rU","3oz1iBguws0","IKDD2uwJrHQ","sJiJt8bC0WA","suitHpQvZrM","19UU3VKrWJE","wML8Whe0uFs","-V-4iq5ic8w","XnrDJV_WQrY","q1Lm9aS0Oxg","L2ZmgHJqSxU","QV-T2xXF0EM","RPQ3WsooBV4","X237R2EYD1k","TotB4T8GXHo","WCVw4j9Dz2c","rrQsQuSsyMA","MyKvPR919gw","dSSz4tFjeeg","cj8pHuD1KDQ","q11tOdqLdno","6FtyuIsN7nY","QpDl0CEgChI","CXuAo3QUgKI","t85OumT730g","mPFvZwv3IFs","sswe9u6BHRw","wmmVb0HwTgo","JXO6yTqk1rU","QLt0ITu64FQ","JKRoJdh2ipQ","w-rIe-v5wL4","e25ZJ6YcX8g","4GesaAQ_b40","RyWTBD6uWos","V1HwBv8-0Mk","qpkxkupSQVs","-nirXjbzLvE","ILsIA2GMz0w","YavnFqrh6cU","osKCQvcNQG0","os_sJSsD-Kk","pln_PgShYWU","w-7tpa4YfeA","rejUow8AGz0","G7jVyKEOdmk","KBXFti9wKOU","DsR-nHh2txM","FuqIY-Xf5Is","NORIoLRsIyE","nGjhgla1N7g","rKW39PZmQFg","-ODfLfdENgQ","27kmRTWtrp0","1DUgIulFU6s","gEpIfpvVG9c","67uZzAazAGE","aX2c53uLCvc","zK61d5IuU1Q","XcXcCqSz4rg","PeesNxm6oro","CFAHDGgiaNU","0vdqMdMZ4Mw","BHkWXXPMJGM","LKVzu4TFMMQ","LscJ9nzBaHw","SK45hKnG5kE","ZNNGg375E9Q","mK2UE_BgZiI","6j5Tyd9cFnw","MA7STl3UMg0","xjblvss96zE","Tjs-TysVFDA","pdg2qqB3Z4A","8IXKfmZ4t9k","zKMgyTKcY0I","W4uaD_LI8CE","fKwixWuGMyg","ZiGFnCtIRC8","15M0iZDgwsU","T9NyFT1Fz2g","zqqr0LMUlic","DATb9R2v_jQ","XMB7jG0zKEU","LMPw3NVcW6M","6tu36F1LYmk","kmgHCx6wEh4","pZgimv-eOjE","mRQPopZw81k","OljJHmKvvyU","5oMBr69IpwM","J0A-E4hHedU","1CrsHDvVnuw","GVa-RHviq8I","7vNLFgapOKc","wz4jgXIJfrk","ldzqG0M5Llc","qYfaySGISo0","JVfOjlXXYTQ","86WdV65NUlE","ioaIEF9Ssdg","HWYVOay33KU","glnGt6iZKYk","jJVbSHdttbY","ZPS9d4LtHQE","a_Pzw2gTWJE","-8OjsgHGryg","H6vd12SFy0I","3S91o5G6wvk","NXx1kOXY3A8","D4txt1tg5E8","gYcQp2JaBUE","Jlq764mazdc","P9vkI9o8zBs","Q--nfEliRkA","fKEuT11IX0c","ydXB-ThLkRw","3vIjoYdf3Mc","t9scp95m_cU","IAB1ImdUf50","0wf9Dqj6k3E","VlfnPupQxcE","nub0X7Fp-RM","nRnTM_Auk5U","lVKMOt1ZuFg","WzCuHWX8Jxw","wVX_Wm_t7Io","GJQs88iAnw0","jq-S3-qCrrA","Ur7aLanoMi0","aSbGxgMiuyA","uIB-kq1Eezs","pUl-fsKyeFw","2F2Q3trwS-g","j8G1M0FMbVc","SkBPrFgWBE4","9H581PKdKVs","3XT-r8YZihE","S9Jpu_Nwfoc","C3dPNn_VKhY","kIZkWjR1v7E","bpt0b4-ukKo","yn0jrYExX74","kjiw2YwYgZU","eHu_5y7o1Gg","z1wJfNDgYrA","KdygeNWyXJo","AL7euMEcUo0","zq8vqOpqpgo","ccuUTQVPznE","XZEVvnZLvj0","p0pfB_Njr80","qaDjDhhK150","Ukds1tE4qx4","5xBvMbR3d2s","g_BiZKG3QYs","_bFWYL-us0Q","_URfc6KCm4s","sdxhzrGvhZ4","cIjbLK3w5Ks","-CQsPSWQTKk","8b3lhDyVqgk","wry2TcYEh0Y","Y18RnNj0J1c","vOVxUwMNd3s","mI98RddILtE","oL3cE-NgTlc","ThN9lPtOusg","ml1SvVCVdAM","1wul4z8pmzU","UVu8BJ8K9j8","kMcOc9KSVFs","LNwAsYqtuqg","lQNnrRiHQ4c","UxPRCDLejs4","u47EIJK3--E","jd8YPp0RxXA","ym5aKVjwYuA","5UF-b0aS14Y","0zSiXywLFDA","X4PEWB7kiSk","QMugMjc2Ma4","nq97l7EFeXM","UpTlhpWIpeU","vf_zN3Is688","D0NFKO325OE","JUQAcqbHXEk","xVroWRO0duI","MV-3GgU6rlo","PK_6qpRrMFg","imOrmg4pF40","yakW8odUnv8","F4oZ9_lXzQk","mD2HX_U6L6E","2qoaMqA-KfY","uzoHid9nPQs","NRpBEa4PYdU","Gp4qPlfFmtM","DU1ueRv1rKk","6yoqOEZGdYI","e8rPXTPFtOE","hYhBuRsG_wU","nrMqtTUVItc","Ml9rQvhnmWY","awK9HQS2hS4","PWWv46Wl5k0","QYKNocGKj6Q","HHQ1Lzi8saQ","wnCwrDw3ejU","TDyIjXZEm_8","VjetsAKcxek","n0D2pdutZPY","rINEhGijNqQ","B4DUmk8TAxI","lWbiWRvzMh0","Vhcf1xMaimg","R5NHPVrvgnE","MhsQwZZS9Lc","TtgZM5cGlho","osEcFtORxKk","RFX0PDvoXM8","SNPEuF9i5E8","atMCfNVxkPE","iFtlt-9gr6I","Sve0-gSyzME","zrT5hI88KEg","3bdLvGOHROI","_EI7SSQaFUg","cSVhEWg_tRs","t1Ahy5WBjpE","_-CEwAagVOc","NLt6aQEYtXA","3-D3xJJMIgU","8CGzpKMNVwo","slv-QEzOLL8","KZY-Auz2QcE","D6GI6JyNmJ8","rcrUYq0bUuM","UHTgWrfivRY","u2fI8eMk3YI","T4j_uD1dFUM","DERT4muFzTo","TxsHM4VwDuQ","0A2l5ygsStE","fiiOIy5XdQ0","WKdlIpBmOrA","aL8rWB2IEFc","vGu_8eHDjzU","VCuiDCjblWE","5KFI_Udd5eU","d0u9S_e6IeE","2GeJHNJWU8Q","ONW5DEDszlI","s055AgtZxPY","hqrYdCKroyM","KISPjkqJ4mY","s8_KToLg-wA","h2Eya4yCXMY","VgZMOy9AaNA","vEmYxfReZKc","qmV4hLQbMnI","UbGuH-kAb6g","N4Wdg1ijMk4","K-dZDCuz87E","15DfBegpGf4","Ta-wahmEXcw","jLOFh2HuTb0","3QmXps4HLlI","02E_pFbjs5E","GoKIU8hVo8c","KPevCj83lOo","L1-FJ8GsJHE","dw16dmvWJ4E","OujhpqKUAHA","kcjXFVOLuz4","x5-PhcjYN6s","a1CqTlPGh0Y","bZtqj36yEfY","JUX690K9K8U","i3Nk2h3oYHg","gj68dMGHUyw","3sLteaAuDeU","QUTh_353MTg","B-S6WMUFAN4","jWoC6Q0KEO0","bQb0ZXGW55I","LfWk8n5aTMk","dQ-67pxN3_M","OAMXoHrshYw","I_YiPDNFIf0","NtuvZjFH2xw","Im3bbgPHv2I","9nwO984Inak","1LN8aKii8Eo","oIJIjJ_6gOM","Uhuc7KkpguI","vtHv16aSk20","o3h67rFZ2pc","Co4a17C_GU4","bwddc9g85dw","C8WJ2pXNEj4","00Zl6pyiC-M","O3rtdqKiJrc","Ld1acrGHRqA","0IdauBJE9s0","JFvaUQNMW_U","nUxyGkbvUjQ","2rwvmH3CsPU","5PkZywYKPWs","8_btGTXF1Lc","LWYaYEhzsEQ","eLwiJwnrpEU","onjkD_iCBVU","mDmoAaIHzmI","_VJGMEH-OSs","HqsHdSyDKwI","EMjVUbcYvwo","deSDLxu4rB4","tX86NGP7258","uvjxZdJBGHc","Qmu0Zo8NqPM","4xJ6PLDZsKY","j--8nB4oby4","eVuyRBRmoVI","oLARp933qks","XSWOyH0dRh4","0aGRGMyGp7A","U2kVMQl77-s","X7DDfbERJpY","HYzkbGgbaAw","StKHdXMIpjc","P1M8TbbgIgg","Tvi-tFT9H_g","BXtOBD_f71k","DAQxhY6F3-0","H-s1mPTgqGE","zJPfzP75QEI","SwqvPyTJIcQ","DFxSk7MHvq0","8ADJotsvwk4","RTou_kM6Rsg","RDCXqTP0FfA","OpYOM_R30Aw","RCsoO4f19Q8","-3rCwNnXS-4","T8Qqg4cvWm4","hyegEY2314Q","hFVYokj6-Wc","a-paMBC8cTA","S3yAsfqF-hE","aSlqTVLLkK4","Okt53LM1hfo","PjnFjM3q4J4","gNice68qt1c","7DKplJhH6Rw","ntLfQbtc4Ok","m1l5zKuaq6E","hsI5MgYIlvY","Km8AzfWm78A","qxw1jNJnhS8","bLieMlLNVjs","05aFSRLOpVw","sGi9bptZaEA","HInLM1f4-Lo","1HtH-UMWPVQ","pdyESsk83Lc","BGhMydA4KPE","uRWBiBzNhj8","bIIRor8z1Wk","fSfHf1r1Kc4","7RSCeqmN9yU","qPFBgcGCGYs","iVxwTAyUEO0","J2eTmC8agOs","2eLL76MYq_0","k8JZa7FquEM","wcfY44oh70Q","BtrPxr7iHRk","yyrF_a2IVXU","Rz3-iC9HZ1k","4m9HJUnww1o","8Le1mdxwrUk","P2lODTs38A8","N9XYtV_37v0","j3Lq8dQsnqw","YXL1PnHUvzw","f4ARhdVxX9k","45VlEVe4jjM","eRh4bJQN-tI","m8RIHtoI6nI","Z0NEP6tp3BI","x9yX5vgAXNI","djVhemGMW3A","76kVjUtATxk","ypHb_9J4yHE","9kG9HRYq_SA","6qP0s6YBxpQ","8heVb0IrsAA","e9v70IlHF3o","-OzfL3d-r9E","l-JiIpSWdNY","P1aHoTiQFxw","xgdttJC5LpM","X3CMXZTl8IM","kObfI6nveOM","qFS-YhoL4J0","d0ld5KJcQWo","wIBKYSnPM_c","RSFpyrTo4YY","5JI8cRPM_lg","czodw-veKXk","YwvI0IquC4o","27MiLryLh6w","j6DIKW1ROas","6jF_fKsc_pI","yDaGRK7ND_g","iM8cya6RcuU","xDGgo40RcmA","rbnPOZTizDo","_yOKTUwUEgc","MooKsYpWF78","N5sdJQ5gOuU","KAfxWzarvmY","kMP4Q5UEgGA","4FZN-lGzTFk","qhMsVziTHe0","o0hArUOa_n4","4IAroMFw7GA","ff2_x89Eb60","q60jIu98oiU","cIMFoBimZ3I","8f8Jqz4S-lA","1ghbIyl_cyA","3Pr577eUfTc","8mozdBCzyZI","c97HmQZ9Sbs","Qh_Ofp9JeUM","L5ncveZyPdM","WeSQExRsdMI","W07qhYBIBU8","XTKWAmCBK04","3o8X3mIOQ2g","Mpgce0T6IOM","zuaAaVnEJbo","XA2GGRt-l8g","-0J9B1qisTk","judCix7LPRA","yjHsLBLLRKU","5_U14GZbcV8","z7e2mURrNp4","ZlTfQ5cQuy0","VD4cDR0GT2A","_DS-zU39imE","z1if964l5cI","etQFmZaDHTA","zx9VrPVEbGo","mcdLHBrM4mE","A7tkLTUuG3g","_TRUl0DvsIk","syf5paydNPM","b34ECB5Qlbs","iRRL5wJdkXY","EObk12JQhLg","xRFbH4o-lGE","r_oZymMh1do","2Utn3VvFoT0","a0diUzCwNXg","u24_IVErpPA","6Sis01XW9CQ","aFbp8rnVbeA","CcWyIUlKbtY","-n2kVD7c6mc","TiesCMZsxuw","GGU2GhI5_n4","bBjEw7uxWbQ","u65_hb1gHrU","7T-Ad2a3EBE","JmZCL3sT9-8","nLqF31Wjv7c","dHgZ0AtSIZg","2UOtCRwGS78","mEWzahpMK1w","DL33ub57ZgE","ab2GF6r2y1g","3Yu3nYiS3L8","e1E02VO84Kw","rWeBWgN8YIQ","rQ-vkOZf4jc","eG1Pw6uKras","tyoFofuY0rs","Wmk5I_8winM","sR_qw19qXEA","EdXBitgCgTs","sBLwC6BQX-s","T5Ux9dctZbU","JFWnY1Pj2VU","hu-I8S77hEg","ffoREby1rzM","IM0knlqhxHo","5CQzwnPpAKY","d-pqcHXx4wc","5_C1LxMH-zk","ndj2DKXMYC8","84SJV5YbwFc","Hk0L7Orq4nk","8M-nYAW-2D8","v8adnncqII0","9BCNfxd81uA","hC6---70Aic","rrTH31VbdXI","0KF98bknZ-U","iv-sCzNa-cI","tnoF9yEuOKI","EIlQWTOmXHA","1hsXUnqPY98","ABVFFsqc75o","fd6ZtGvGGiA","gtWN4IEIZuY","uUyJvJc-Rdw","douJMIpX9Cw","y0uJUsGG1ik","fGo3MjYY_qI","7Bv-WVumpT0","aryY88xXyIQ","pYGH7DErEAs","OZPmCOluhGg","mT7Tc_4nTL8","x7C-b3aZvj0","yo-Qk7LXl6Y","KlwBS5qZnZs","cz9hapGsHuA","ojB3j0U9x90","JXU5j4bcw9c","bckN_N1tOvM","EIp2XB7z-Mg","-WH4yGnoTj0","s99e4sMQtAk","iKfKpU1D5hs","6bEgrfX8xTs","Tivzz_x25vU","MikBAS6_U6A","lEaU3NyWsVM","o2kDLLyKhdQ","lcTBWRj5rqE","oWhKgmaF4m8","LOwnuyRUwBU","IX02NbzHCwA","-E0qXyFifLQ","753Tko6SDX8","Yhok-N3uK4I","ahgC1HHGgIU","oSkvL7ethVI","C74hOZMSLwg","nkZFF23qV2o","xAnbTgrdZfY","ZFsgX-EpKXE","Avg3IztWKLI","jNp3QIZDoGA","mM-bf4bZcwY","vyehJm5NSU0","ZrTOhTspBNE","RrKC_U-Y67M","NHwg0_uw15Y","DsSA8XNbNNg","aFEmMgq4o2w","Fnm8miDxvOk","GkmOFBiQKJE","tsjBER2tmvY","kEZq0F4_5y8","pfFmulPtPCo","FnZlB3bujA4","n_BapNOd6LI","H8p-7N_DNVk","SD65FUXD3Rw","JrEv-bTAIiA","Z5ubq_-krmo","BYALejMNLmQ","FAzt-ZdVemM","caJgENn2iVA","ixIbAO8-G9U","4191FU71JqI","dWzEhp2wpf8","JobhRYlPNxg","mSFl-RT78-g","tC7ztTblgG0","KuYtQ-Xugg8","6uArSz_mYDo","qs8O77KQ49U","U_hWJIj5TUI","GOoIXdhHVR0","PjG777AK-EM","vSj55nv8kBE","ihuK3gvWoQE","gTu9Gd7N4MU","ua3NVYslYzI","eAtRYN1oCFU","raQ3I5DYssU","FX5iSGa0524","Qv7AWC-2qow","vbHgr1qouZ8","bWtFUlOiymw","2iYarOwyAe4","TzSGHWUDX3A","YucNStROJxo","K39rzysTznc","-XOON8au6Wk","olpIIyudwD8","FCz8KDpQrXA","Vnf_zg7cXts","QhusY_MLMeQ","yryJYkSKUJY","8UNhkr086HE","E8fymk6wTZs","HtGVWts4ZUo","cY2KpHbaw_Y","FblclR3BpUw","S-cO39Tz_Ec","sg24vmRE57Y","TnXYeRU7-CE","3pOhaQgKKBg","At5ajHRpMh8","z-Ddx1Wu-jE","uazubaX00Zo","jErhrFX2uKo","cPFccfHuY9U","Pq9AnKJiQfg","awAKFq_re9w","5VUFHlZ-BLU","KSFXvPkbwG0","Zffjqiyx298","Yl5Tr03EZmg","MgpOf1udE00","OjzQDerboE0","cyUPz_H4DxU","mkfMkOr1EKs","9IqtS2rvVUw","HYCs-UlHDPo","tsTk9RufiAQ","fBpq2BgMfa0","gx8iQjelcYg","eHvbgWp86Sc","gwQBEI7gw9c","PjISKK49Rqc","S603l3MiEQ8","CVrOL3wbPAo","k_lV7lm6f34","-81ZhuUakp0","5WeHrc6ORvE","i50cRleBzxY","n1tt5K5G1d8","LCC-AfU7y2M","s254IPHXgVA","sG1zBrIrgjQ","SV2y8GJmopw","x4nRKcNQIhg","QZ2oj5N3xNg","CpCBl3GYXag","4vO7rI2ztqE","Eh9CiMFJItU","vZCCav2i3_s","wPgRGj3UBEA","qjMc9mIArJM","Uf4F05IvjGA","pWS_epyY59Y","E0cDcJzhEKo","qVWsEgrgQ-s","_LmtzC_N194","o1Xnvb7QKo4","TczZWeBMUjI","xQa8CDLlKeI","kqakmGVZEFM","kKgDGxtpI5o","-amyXIMfohU","VwYH3-QBc3Q","0u73czFWTf0","S-1Eqaoyp7M","V9NjCos0aQ4","zfuA4WNvqz0","cQuqRSIF9io","gxklws0fKeM","HbFadtOxs4k","MA8CxUTVF3M","0wq2O4P-15g","8tPEDFvfnuM","kdDCp21puto","X5Rr3sylkvA","kdFL75f_ink","kzH66EvcE1M","cyvQWDG8mUo","Ff591xxo5to","dTByeOglgGg","2nPxJdftmRQ","yinln6CDH7w","RBvrlnDxj-U","25e6LShkZdk","O5nuiygbTTs","eKiNhYjSEw4","qckBHlpRiuA","Vh641gOOBGw","h11CStO1Mvs","haeXwgThvGE","8HUVqF2s3xk","WzU74TfLqSE","mlQRniZog80","cjSM1H6vmPw","uJSRoJmfz5A","TkZW8IhD3G0","_Xum03G8oFQ","MFVKX_qRaY0","sUrOjR166aw","NB9We5wwGPo","l0ZuSIHyhIY","LFy6EWo0tJU","WHuOgp9ZZZ4","uG1TYy5_tA8","Ox1W6CnwVdg","jdybT1NbA1c","JkxarfZfmr8","l1b8rgn9S8k","ObLcGd7yKtc","AqValUHUrJM","WGycb1Q8FrY","eAjty0GIoc0","Q3mwEJjZE0w","8tseOOfTTAE","IXdlXiiHUkU","QOlqi4wi4Zg","cRlxVVz0lcA","xs_a5PQZocY","FzgHt87outY","-CypxBLCBzY","6QMGcuFkAyI","v5cq8e75lA4","4VPjz6aGXsk","qWA18OVU0CA","ifxdb5k_e_8","7qh_leexNos","t2NjRNQ8Mx8","Ly_2HxjYdzw","wCFW0Z3AgeE","KAkju7nrTkw","qAg5I7klH84","ukZjJNyqY9w","rPDlN5GUkVs","sqDlLrByWkw","Jza76A07lYM","MJQ5m9HEErI","s_xp6yEzYVE","-UogZwp3Y1w","DSSAG7w1Oo0","L62cPSLtFPg","w8-vYbPaY0E","unZcIAq7uQ0","Kh5Wqit84Vk","9r_gs5-B9gE","rZRjjUxQkBY","WsMxe3nINns","xchqRJdsf0g","KWzMsZuEdTM","hkzQM404A-A","S3XvYOu8vY0","yru-ud9Lp-A","qBywxrNrEtk","qvC5kPcLqA0","lIaeL-b-GqU","fr2Z_dDv5wc","dyS9Yhson8E","YQ-yVW9e5wQ","QdgE0TZjgjs","LeipaBXbEi4","a7U0cMuy8no","P_uL4k4kckM","1NS-eogteA0","UwN1HwSB1yg","y7QmTecBf2Y","eEHD1EIoE74","3kX9XziyQBM","126PoMixTIA","3-JB2KUdI0Y","B02cN8_p5Zw","DemV9ucfTqM","sSeegg-emkM","yZmGD33mYic","1NN2FiltH9w","I8B3JDrj8jg","ugvcoVhpRy4","FHh_CBR6XVw","k0JpWoIZLmk","D8sQWKhWZQo","K_XNIrAELH0","XkeRnSEe7o8","mAa8xpaJvj0","WV34-7hpKLE","3RR9Mp3tv3o","NvLMrebkSK0","L2fGosqJp2Q","B6XTFa9ikpw","e53ssyZ2hgs","UKdvcYNoQGw","vApxsvymGyo","EJEhImBu4E8","GgtiUJQw7uo","yd1A8QQ6fSM","nym0L0_noRs","uPHry2yMHSQ","-QaPlQFx6PQ","ct1MchXkZKQ","zy-aAvkajV8","NIZIEiynPcg","3f4-hYTCiqo","l8ktLT4dTW4","pbYRWC9HnQo","pc994mR-Yy0","Tp8eYVYOHog","U0ARZzPLSWI","L6N_Qafw1B8","dCim76osuV0","TfZIZuyLiC0","fnnFQ3Jnd3Q","D91UFO1X88s","zqucoJrUPxQ","7r59kIHmSWU","-BhN9JUqSKk","DjZgTpS75Ck","Yf6GisLhZk0","_Rfd8H8uigM","1eP7Yo9JDvw","wFI-5-KbBWk","5qFsX-dU3j0","XJio28OMLnI","BysbKATgkWU","C-5IHkefzSQ","Jl-RjaOVS_w","_F6dzAgtROw","-CexHEr8Iwk","4zLzLXa-sn8","MkPjyJCVdXI","h0tAOOuRBGk","jk3rR-KwK-c","oTbGWrNt75Q","cc8yY6kZ69g","fpw0jC8ugv0","oyOWWLvmdf0","7QVYyeo8jDI","M7EWEUFSZAM","rboMGVOLZLE","MkEdLbeQZo8","a1Evocjpy8A","hCUuM8F_0VE","V8C7vOXD7YA","FRB3c1L4Kkw","H5LlWILUkXU","7boTbVSs3FM","IL5lFFMnd68","HqkBtbsrND0","umoqKgEP9xo","YJALj2AESRg","0jyd5_C-bSU","XxBKF7DylfY","rB4hLYFaV08","81cPAlswCAk","Gz8QeqOi-sg","g41oWl6NWT8","p1p-3bJfdH4","jGsTI739XFk","MxQ_iEV--74","6eAFqwzIWXI","x-blTQ1HHqw","7cQk4LiZM8o","d23nipXqle0","607x4TckFrQ","qZWBlt5H_pY","GomSeL45eQw","KVIpT3W_Bto","HRT_uPCrKDE","mqRCD5SeSRQ","s-bcM5AIoo4","gk3ZitYy16A","dDnG0Ao3k8Q","8VtzZm8-j5s","Xjf_TCtmCpw","WK4Whm4fPdc","n7hMJ453Z_M","pu9sth4yLAs","2GPsiGkPp1E","2LDtqG6QJ2Y","Z9rX1Uv_7CA","Ru4ThpdKxZM","9Qt80b5TOyE","wzOX102pVDU","6UQ-oWLsf4E","hQjtTLVsjgg","y_zE_8aXtb8","rGHfCEfEIzM","KU1TpPLjRzI","iozo6_4jW4A","RzQwkwKDvG8","CW7Jf4ew1gk","PDMMH5wmKKc","k34crDqgPiY","RDBvrpTqLa0","R4Ngp4sLtsw","gqrt0gASAnU","wJLElQmS-OA","IEn8nLJlHco","OAHBsbmf86o","WUB9LPHvm2o","L5IJvzlgUik","7Kun4PZdR7o","uqIf522vbL4","Y6gqarihYGM","s7grUY4uguo","rwciUBUk_mk","10aIMINreh0","BsSxYvltlXA","iRIJLMstfx4","O-0_ngdMeAQ","KT-J3Zf93qg","y3ypJdInLZM","0WvV1tJu08s","I_1ueXfLgxs","Tb9OMrBLFpg","olJmbgs4Wu4","Wusct_lvu7Y","3RPiIABqXEA","sbO9LDjm0lA","myd8QB5vkm8","jZtES1OiNLM","h5A0vqwZ3g8","qFqT07nrnog","1YGVCse5yQ0","pWoAwFavzVc","bVKmyHBvN6I","SAErVjJpOWc","jkpJzWy4mR0","NDBgxggtZOw","gNDgxmCGxhg","AR3XX6DzTLo","fN_KAX-YJvo","7O2mzwHVIA0","j74D-vDxGJM","lfGsAZirt58","8Ay0rEj_drA","G-lVr9wQtdY","m1hNcVk2poE","Ngz38C7rV_A","WkaPMwqaRqo","FXhlZN5J6hk","0dqX3NjwaQs","e9LsisiXQUk","A6NZPyKV_lE","KJihe8I1NmM","XheaRpF5WEE","nQb2430Arhc","Hm7XUU1vJ1k","4iKTdfLoME8","iE5nsjHD7Lo","EZFGvLXOwno","Os-NAgdFx0I","nHCq19Hc9Wo","aw5Acq-H1lg","2_ayT1HzRTg","d8iLknQwG8o","nVU19p3Uw1g","fHE8OE1zgzg","LAVB369nciA","QplrN0Wj0Bs","47QmB56v5oE","JoGU43x6eCI","X2qUphNenxY","IxB-hmwoVw4","2__Dd_KXuuU","ko7OvhBSnt4","9euufV0Yefw","-K31I3fSEGg","UTXDkerqbqc","XGifsHVUzi8","jr6E2soLpho","0q53QOV5JHg","js1Gj8ql2rs","exR470YfCK4","n-biQIiiyl0","p9MIDtBVtoE","6oSLj0L9EdQ","m2_5hdx0Kf0","bq5BhRSaFI4","zIMugbHku3Q","DftcXfjt3YU","k-vPtZc89ZE","M6jLZfRFn5E","b701XRtOhsw","Shz30sEEyT8","xolIJYaj628","3g7cN3Rsi-w","oZGz1o9gD7Q","zvVkEgrzDzk","FybmhvihKtM","LDfPrhZujgM","IUu7fSNxfIc","hVqIc3S3-jY","u9CIzVIgyRs","Z4zdY7ZMyYw","fgYqu7_9EWc","CZkpcomPP4o","ao0ghRfs7XE","FqnCHp3YbNc","Gy6PvCU072c","7rvix2g3OmY","em0bsgUCzfY","fycJupJTVck","uMlGJw-jPxM","lca2KdeudhI","cmJU4rgw3DU","8g4NSZwcLRs","gcnA2dqzyKw","Lc4Rf8uGyVg","nGhoikr5EkA","NsYTYwgMh08","blPOnJ0G6JI","sjJlSIxDhWk","y9kYe0u-HCM","GzxBsK5cDxQ","t04td2pOWvs","H0qjrn13_7k","UaoxlX_KHo0","GtSrIKCtuEA","kM_eiWugqIg","7YwC2iNZ4-w","sSidiNHSFIo","YTXsjzQgIjw","9vBOZmvam24","NzaStiUxoYc","uSGddVn1Wto","a30fLLdAhdg","HyLmB7GF6ik","Oj-QKeq2Pq8","Fr4mgg0RuBo","WDdkDMP72No"];
const firefoxProfilePath = "C:\\Users\\vince\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\rg106mu4.default";

(async function runner() {

  const sleepDuration = 1000;
  const mouseMoveSpeed = 500;

  const findVideoItems = async function (driver, videoId) {
    const urlStartsWith = `/watch?v=${videoId}&`
    const videoItemLocator = By.xpath(`//ytd-playlist-video-renderer[.//a[@id='video-title'][starts-with(@href, '${urlStartsWith}')]]`);

    return await driver.findElements(videoItemLocator);
  };

  const openActionMenuForVideo = async function (driver, videoItem) {
    const menu = await videoItem.findElement(By.id('menu'));
    const button = await menu.findElement(By.id('button'));
    await driver.actions()
      .move({ origin: button, duration: mouseMoveSpeed })
      .pause(300)
      .click()
      .perform();
    await driver.sleep(sleepDuration);
  };

  const clickRemoveItemFromActionMenu = async function (driver, videoItem) {
    var removeItem = await driver.findElement(By.xpath("//ytd-menu-service-item-renderer[.//yt-formatted-string/span = 'Supprimer de ' ]"));
    await driver.actions()
      .move({ origin: removeItem, duration: mouseMoveSpeed })
      .pause(300)
      .click()
      .perform();
    await driver.sleep(sleepDuration);

  };

  const scrollToVideo = async function (driver, videoItem) {
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })", videoItem);
    await driver.sleep(sleepDuration);
    const title = await videoItem.findElement(By.id('video-title'));
    await driver.actions()
      .move({ origin: title, duration: mouseMoveSpeed })
      .perform();
    await driver.sleep(sleepDuration);
  }

  const tryRemoveVideoFromPlaylist = async function (driver, videoId) {

    const videoItems = await findVideoItems(driver, videoId);
    if (videoItems.length == 0) {
      console.log(`Video ${videoId} not found`);
    } else {
      for (var index = 0; index < videoItems.length ; index++) {
        const videoItem = videoItems[index];
        console.log(`Video ${videoId} (${index}) being removed…`);
        await scrollToVideo(driver, videoItem);
        await openActionMenuForVideo(driver, videoItem);
        await clickRemoveItemFromActionMenu(driver, videoItem);
      }
    }
  }

  const getCountByXpath = async function (driver, xpath) {
    var locator = By.xpath(xpath);
    var items = await driver.findElements(locator);
    return items.length;
  }

  const scrollToBottom = async function (driver) {
    while (true) {
      const count = await getCountByXpath(driver, '//ytd-playlist-video-renderer');
      if (count % 100 === 0 && count < 2400) { // TODO BUG find a better way to detect the end of the page
        console.log(`Scolling to bottom (${count})`)
        await driver.executeScript('window.scrollTo(0,1000000);');
        await driver.sleep(sleepDuration);
      } else {
        break;
      }
    }
  }


  let options = new firefox.Options();
  options.setProfile(firefoxProfilePath);

  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();


  try {
    await driver.get(`https://www.youtube.com/playlist?list=${playlistId}`);
    await driver.sleep(1500);

    await scrollToBottom(driver);

    for (var index = 0; index < videosToRemove.length; index++) {
      const videoId = videosToRemove[index];
      await tryRemoveVideoFromPlaylist(driver, videoId);
    }

    const input = await driver.findElement(By.css('input#search'));
    const doneText = `Done (${(new Date()).toISOString()})`
    input.sendKeys(doneText);


  } finally {
    // await driver.quit();
  }
})();