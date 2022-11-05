// ==UserScript==
// @name         JPDB Wanikani Lookup
// @namespace    https://github.com/Dorifor
// @version      1.1
// @description  Add corresponding Wanikani level on kanji pages (and "kanji used" section of reviews) (initial list from https://github.com/Kumirei/Yomichan-Info-Tags/)
// @author       Mao#2071
// @match        https://jpdb.io/kanji/*
// @match        https://jpdb.io/review*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jpdb.io
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const kanjis = {"一":1,"二":1,"九":1,"七":1,"人":1,"入":1,"八":1,"力":1,"十":1,"三":1,"上":1,"下":1,"口":1,"大":1,"女":1,"山":1,"川":1,"工":1,"刀":2,"土":2,"千":2,"夕":2,"子":2,"小":2,"丁":2,"了":2,"又":51,"丸":2,"才":2,"中":2,"五":2,"六":2,"円":2,"天":2,"手":2,"文":2,"日":2,"月":2,"木":2,"水":2,"火":2,"犬":2,"王":2,"出":2,"右":2,"四":2,"左":2,"本":2,"正":2,"玉":2,"田":2,"白":2,"目":2,"石":4,"立":2,"万":3,"久":32,"今":3,"元":3,"公":3,"内":3,"分":3,"切":3,"午":3,"友":3,"太":3,"少":3,"引":3,"心":3,"戸":3,"方":3,"牛":3,"父":3,"毛":3,"止":3,"兄":5,"冬":3,"北":3,"半":3,"古":3,"台":3,"外":3,"市":3,"広":3,"母":3,"用":3,"矢":3,"世":4,"主":4,"他":4,"代":4,"写":4,"去":4,"号":4,"央":4,"平":4,"打":4,"氷":4,"申":4,"皮":5,"皿":4,"礼":4,"休":4,"先":4,"名":4,"字":4,"年":4,"早":4,"気":4,"百":4,"竹":4,"糸":4,"耳":4,"虫":4,"村":4,"男":4,"町":4,"花":4,"見":4,"貝":4,"赤":4,"足":4,"車":4,"不":4,"仕":4,"交":5,"会":5,"光":5,"同":5,"回":5,"多":5,"当":5,"毎":5,"池":8,"米":5,"羽":5,"考":5,"肉":5,"自":5,"色":5,"行":5,"西":5,"何":5,"体":5,"作":5,"図":5,"声":5,"売":9,"弟":5,"形":5,"来":5,"社":5,"角":5,"言":5,"谷":5,"走":5,"近":5,"里":5,"麦":5,"学":5,"林":5,"空":5,"金":5,"雨":5,"青":5,"草":5,"音":5,"化":6,"地":6,"両":6,"全":6,"向":6,"安":6,"州":6,"曲":6,"有":6,"次":6,"死":6,"羊":6,"血":6,"京":6,"国":6,"夜":6,"妹":6,"姉":6,"店":6,"明":6,"東":6,"歩":6,"画":6,"直":6,"知":6,"長":6,"前":6,"南":6,"室":6,"後":6,"思":6,"星":6,"活":6,"海":6,"点":6,"科":6,"茶":6,"食":6,"首":6,"欠":7,"氏":7,"由":7,"札":7,"民":7,"辺":7,"付":7,"以":7,"失":7,"必":7,"未":7,"末":7,"校":7,"夏":7,"家":7,"弱":7,"時":7,"紙":7,"記":7,"通":7,"高":7,"強":7,"教":7,"理":7,"組":7,"船":7,"週":7,"雪":7,"魚":7,"鳥":7,"黄":7,"黒":7,"支":8,"住":8,"助":8,"医":8,"君":8,"対":8,"局":8,"役":8,"投":8,"決":8,"究":8,"身":8,"者":8,"研":8,"馬":8,"森":8,"場":8,"朝":8,"番":8,"答":8,"絵":8,"買":8,"道":8,"間":8,"雲":8,"数":8,"楽":8,"話":8,"電":8,"所":8,"事":9,"使":9,"具":9,"受":9,"和":9,"始":10,"定":9,"実":9,"服":9,"泳":9,"物":9,"苦":9,"表":9,"部":9,"乗":9,"客":9,"屋":9,"度":9,"待":12,"持":9,"界":9,"発":9,"相":9,"県":9,"美":9,"負":9,"送":9,"重":9,"談":9,"要":9,"勝":9,"仮":9,"起":10,"速":10,"配":10,"酒":10,"院":10,"終":10,"習":10,"転":10,"進":10,"落":10,"葉":10,"軽":10,"運":10,"開":10,"集":10,"飲":10,"業":10,"漢":10,"路":10,"農":10,"鉄":10,"歌":10,"算":10,"聞":10,"語":10,"読":10,"鳴":10,"線":10,"横":10,"調":10,"親":10,"頭":10,"顔":10,"病":10,"最":10,"争":11,"仲":11,"伝":11,"共":11,"好":11,"成":11,"老":11,"位":11,"低":11,"初":11,"別":11,"利":11,"努":11,"労":11,"命":11,"岸":11,"放":11,"昔":11,"波":11,"注":11,"育":11,"拾":11,"指":11,"洋":11,"神":11,"秒":11,"級":11,"追":11,"戦":11,"競":11,"良":11,"功":11,"特":11,"便":11,"働":11,"令":11,"意":11,"味":11,"勉":12,"庭":12,"息":12,"旅":12,"根":12,"流":12,"消":12,"倍":12,"員":12,"島":12,"祭":12,"章":12,"第":12,"都":12,"動":12,"商":12,"悪":12,"族":12,"深":12,"球":12,"童":12,"陽":12,"階":12,"寒":12,"悲":17,"暑":12,"期":12,"植":12,"歯":12,"温":12,"港":12,"湯":12,"登":12,"着":12,"短":12,"野":12,"泉":12,"生":3,"亡":6,"合":12,"風":7,"予":9,"反":8,"々":2,"新":9,"返":9,"問":13,"宿":13,"想":13,"感":13,"整":13,"暗":13,"様":13,"橋":13,"福":13,"緑":13,"練":13,"詩":13,"銀":13,"題":13,"館":13,"駅":13,"億":13,"器":13,"士":13,"料":13,"標":13,"殺":13,"然":13,"熱":13,"課":13,"賞":13,"輪":13,"選":13,"鏡":13,"願":13,"養":13,"像":13,"情":13,"謝":13,"映":13,"疑":13,"皆":13,"例":14,"卒":14,"協":14,"参":14,"周":14,"囲":14,"固":14,"季":14,"完":14,"希":14,"念":14,"折":14,"望":14,"材":14,"束":14,"松":14,"残":14,"求":10,"的":14,"約":14,"芸":14,"基":14,"性":14,"技":14,"格":14,"能":14,"術":14,"私":6,"骨":14,"妥":14,"雰":14,"頑":14,"寺":15,"岩":15,"帰":15,"春":15,"昼":15,"晴":15,"秋":15,"計":15,"列":15,"区":15,"坂":15,"式":15,"信":15,"勇":15,"単":15,"司":15,"変":15,"夫":15,"建":15,"昨":15,"毒":15,"法":15,"泣":15,"浅":15,"紀":15,"英":15,"軍":15,"飯":15,"仏":15,"築":15,"晩":15,"猫":15,"園":16,"曜":16,"書":16,"遠":16,"門":16,"係":16,"取":16,"品":16,"守":16,"幸":16,"急":16,"真":16,"箱":16,"荷":16,"面":16,"典":16,"喜":17,"府":16,"治":16,"浴":16,"笑":16,"辞":16,"関":16,"保":9,"弁":16,"政":16,"留":16,"証":16,"険":16,"危":16,"存":16,"専":16,"冒":16,"冗":16,"阪":16,"原":17,"細":17,"薬":17,"鼻":17,"側":17,"兵":17,"堂":17,"塩":17,"席":17,"敗":17,"果":17,"栄":17,"梅":17,"無":17,"結":17,"因":17,"常":17,"識":17,"非":17,"干":17,"是":17,"渉":17,"虚":17,"官":17,"察":17,"底":17,"愛":17,"署":17,"警":17,"恋":17,"覚":17,"説":17,"幻":17,"訓":18,"試":9,"弓":18,"告":18,"種":18,"達":18,"類":18,"報":18,"祈":18,"等":18,"汽":18,"借":18,"焼":18,"座":18,"忘":18,"洗":18,"胸":18,"脳":18,"僧":18,"禅":18,"験":9,"可":18,"許":18,"枚":18,"静":18,"句":18,"禁":18,"喫":18,"煙":18,"加":19,"節":19,"減":19,"順":19,"容":19,"布":19,"易":19,"財":19,"若":19,"詞":19,"昆":19,"閥":19,"歴":19,"舌":19,"冊":19,"宇":19,"宙":19,"忙":19,"履":19,"団":19,"暴":19,"混":19,"乱":19,"徒":19,"得":19,"改":19,"続":19,"連":19,"善":19,"困":20,"絡":19,"比":19,"災":20,"機":20,"率":20,"飛":20,"害":20,"余":20,"難":20,"妨":20,"被":20,"裕":20,"震":20,"尻":20,"尾":20,"械":20,"確":20,"嫌":20,"個":20,"圧":20,"在":20,"夢":20,"産":20,"倒":20,"臭":20,"厚":20,"妻":20,"議":20,"犯":20,"罪":20,"防":20,"穴":20,"論":20,"経":20,"笛":19,"史":19,"敵":21,"済":21,"委":21,"挙":21,"判":21,"制":21,"務":21,"査":21,"総":21,"設":21,"資":21,"権":21,"件":21,"派":21,"岡":21,"素":21,"断":21,"評":21,"批":21,"任":21,"検":21,"審":21,"条":21,"責":21,"省":21,"増":21,"税":21,"解":21,"際":21,"認":21,"企":21,"義":21,"罰":22,"誕":22,"脱":22,"過":22,"坊":22,"寝":22,"宮":22,"各":22,"案":22,"置":22,"費":22,"価":22,"勢":22,"営":22,"示":22,"統":22,"領":22,"策":22,"藤":22,"副":22,"観":22,"値":22,"吸":22,"域":22,"姿":22,"応":22,"提":22,"援":22,"状":22,"態":22,"賀":22,"収":23,"停":23,"革":23,"職":23,"鬼":23,"規":23,"護":23,"割":23,"裁":23,"崎":23,"演":23,"律":23,"師":23,"看":23,"準":23,"則":23,"備":23,"導":23,"幹":23,"張":23,"優":23,"宅":23,"沢":23,"贅":23,"施":23,"現":23,"乳":23,"呼":23,"城":23,"俳":23,"秀":23,"担":24,"額":24,"製":24,"違":24,"輸":24,"燃":24,"祝":24,"届":24,"狭":24,"肩":24,"腕":24,"腰":24,"触":24,"載":24,"層":24,"型":24,"庁":24,"視":24,"差":24,"管":24,"象":24,"量":24,"境":24,"環":24,"武":24,"質":24,"述":24,"供":24,"展":24,"販":24,"株":24,"限":25,"与":25,"含":25,"影":25,"況":25,"渡":25,"響":25,"票":25,"景":25,"抜":25,"訴":25,"訟":25,"逮":25,"補":25,"候":25,"構":25,"模":25,"捕":25,"鮮":25,"効":25,"属":25,"慣":25,"豊":25,"満":25,"肥":25,"巻":25,"捜":25,"絞":25,"輩":25,"隠":25,"掛":25,"替":25,"居":25,"造":26,"授":26,"印":26,"創":26,"復":26,"往":26,"較":26,"筆":26,"鉛":26,"貯":26,"故":26,"障":26,"従":26,"我":26,"激":26,"刺":26,"励":26,"討":26,"郵":26,"針":26,"徴":26,"怪":26,"獣":26,"突":26,"菓":26,"河":26,"振":26,"汗":26,"豚":26,"再":26,"接":26,"独":26,"占":26,"招":27,"段":27,"胃":27,"腹":27,"痛":27,"退":27,"屈":27,"悩":27,"暇":27,"織":27,"貸":27,"迷":27,"惑":27,"誘":27,"就":27,"訪":27,"怒":27,"昇":27,"眠":27,"睡":27,"症":27,"締":27,"迫":27,"靴":27,"濃":27,"端":27,"極":27,"途":27,"健":27,"康":27,"郎":27,"給":27,"逆":28,"巨":28,"庫":28,"児":28,"冷":28,"凍":28,"幼":28,"稚":28,"処":28,"博":28,"清":28,"潔":28,"録":28,"隊":28,"修":28,"券":28,"婦":28,"奇":28,"妙":28,"麗":28,"微":28,"益":28,"移":28,"程":28,"精":28,"絶":28,"並":28,"憲":28,"衆":28,"傘":28,"浜":28,"撃":28,"攻":28,"監":29,"杯":29,"乾":29,"催":29,"促":29,"欧":29,"江":29,"請":29,"雄":29,"韓":29,"壊":29,"診":29,"閣":29,"僚":29,"積":29,"督":29,"臣":29,"略":29,"航":29,"寄":29,"板":29,"街":29,"宗":29,"緊":29,"娘":29,"宴":29,"怖":29,"恐":29,"添":29,"猛":29,"烈":29,"索":29,"詰":29,"詳":17,"魅":30,"渇":30,"系":30,"婚":30,"遊":30,"旗":30,"照":30,"快":30,"版":30,"貧":30,"乏":30,"適":30,"預":30,"延":30,"翌":30,"覧":30,"懐":30,"押":30,"更":30,"枕":30,"浮":30,"漏":30,"符":30,"購":30,"越":30,"飾":30,"騒":30,"背":30,"撮":30,"盗":30,"離":31,"融":31,"編":31,"華":31,"既":31,"普":31,"豪":31,"鑑":31,"除":31,"尋":31,"幾":31,"廊":31,"掃":31,"泥":31,"棒":31,"驚":31,"嘆":31,"倉":31,"孫":31,"巣":31,"帯":31,"径":31,"救":31,"散":31,"粉":31,"脈":31,"菜":31,"貨":31,"陸":31,"似":31,"均":31,"墓":31,"富":31,"徳":31,"探":31,"偵":31,"綺":28,"序":32,"迎":32,"志":32,"恩":32,"採":32,"桜":32,"永":32,"液":32,"眼":32,"祖":32,"績":32,"興":32,"衛":32,"複":32,"雑":32,"賛":32,"酸":32,"銭":32,"飼":32,"傷":32,"党":32,"卵":32,"厳":32,"捨":32,"込":32,"密":32,"汚":32,"欲":32,"暖":32,"机":32,"秘":32,"訳":32,"染":32,"簡":33,"閉":33,"誌":33,"窓":33,"否":33,"筋":33,"垂":33,"宝":4,"宣":33,"尊":33,"忠":33,"拡":33,"操":33,"敬":33,"暮":33,"灰":33,"熟":33,"異":33,"皇":33,"盛":33,"砂":33,"漠":33,"糖":33,"納":33,"肺":33,"著":33,"蒸":33,"蔵":33,"装":33,"裏":33,"諸":33,"賃":33,"誤":34,"臓":34,"貴":34,"降":34,"丼":34,"吐":34,"奴":34,"隷":34,"芋":34,"縮":34,"純":34,"縦":34,"粋":34,"聖":34,"磁":34,"紅":34,"射":34,"幕":34,"拝":34,"薦":34,"推":34,"揮":34,"沿":34,"源":34,"劇":17,"勤":34,"歓":34,"承":34,"損":34,"枝":34,"爪":34,"豆":34,"刻":34,"腐":34,"遅":35,"彫":35,"測":35,"破":35,"舎":35,"講":35,"滞":35,"紹":35,"介":35,"己":35,"厄":35,"亀":35,"互":35,"剣":35,"寿":35,"彼":35,"恥":35,"杉":35,"汁":35,"噌":35,"炎":35,"為":35,"熊":35,"獄":35,"酔":35,"酢":35,"鍋":35,"湖":35,"銅":35,"払":35,"油":35,"醤":35,"旧":36,"姓":36,"貿":36,"将":36,"盟":36,"遺":36,"伸":36,"債":36,"及":36,"奈":36,"幅":36,"廃":36,"甘":36,"換":36,"摘":36,"核":36,"沖":36,"縄":36,"津":36,"献":36,"療":36,"継":36,"維":36,"舞":36,"伎":36,"踏":36,"般":36,"頼":36,"依":36,"鹿":36,"諾":36,"牙":36,"跳":37,"昭":37,"漁":37,"償":37,"刑":37,"募":37,"執":37,"塁":37,"崩":37,"患":37,"戻":37,"抗":37,"抵":37,"旬":37,"湾":37,"爆":37,"弾":37,"聴":37,"跡":37,"遣":37,"闘":37,"陣":37,"香":37,"兆":37,"臨":37,"削":37,"契":37,"恵":37,"抱":37,"掲":37,"狙":37,"葬":37,"需":38,"齢":38,"宜":38,"繰":38,"避":38,"妊":38,"娠":38,"致":38,"刊":38,"奏":38,"伴":38,"併":38,"傾":38,"却":38,"奥":38,"慮":38,"懸":38,"房":38,"扱":38,"抑":38,"択":38,"描":38,"盤":38,"称":38,"緒":38,"緩":38,"託":38,"賄":38,"賂":38,"贈":38,"逃":38,"還":38,"超":36,"邦":39,"鈴":39,"阜":39,"岐":39,"隆":39,"雇":39,"控":39,"壁":39,"棋":39,"渋":39,"片":39,"群":39,"仙":39,"充":39,"免":39,"勧":39,"圏":39,"埋":39,"埼":39,"奪":39,"御":39,"慎":39,"拒":39,"枠":39,"甲":39,"斐":39,"祉":39,"稲":39,"譲":39,"謙":39,"躍":39,"銃":39,"項":39,"鋼":39,"顧":40,"駐":40,"駆":40,"柱":40,"唱":40,"孝":40,"俊":40,"兼":40,"剤":40,"吹":40,"堀":40,"巡":40,"戒":40,"排":40,"携":40,"敏":40,"鋭":40,"敷":40,"殿":40,"犠":40,"獲":40,"茂":40,"繁":40,"頻":40,"殖":40,"薄":40,"衝":40,"誉":40,"褒":40,"透":40,"隣":40,"雅":40,"遜":41,"伺":41,"徹":41,"瀬":41,"撤":41,"措":41,"拠":41,"儀":41,"樹":41,"棄":41,"虎":41,"蛍":41,"蜂":41,"酎":41,"蜜":41,"墟":41,"艦":41,"潜":41,"拳":41,"炭":41,"畑":41,"包":41,"衣":41,"仁":41,"鉱":41,"至":41,"誠":41,"郷":41,"侵":41,"偽":41,"克":42,"到":42,"双":42,"哲":42,"喪":42,"堅":42,"床":42,"括":42,"弧":42,"挑":42,"掘":42,"揚":42,"握":42,"揺":42,"斎":42,"暫":42,"析":42,"枢":42,"軸":42,"柄":42,"泊":42,"滑":42,"潟":42,"焦":42,"範":42,"紛":42,"糾":42,"綱":42,"網":42,"肝":42,"芝":42,"荒":42,"袋":42,"誰":43,"珍":43,"裂":43,"襲":43,"貢":43,"趣":43,"距":43,"籍":43,"露":43,"牧":43,"刷":43,"朗":43,"潮":43,"即":43,"垣":43,"威":43,"封":43,"筒":43,"岳":45,"慰":43,"懇":43,"懲":43,"摩":43,"擦":43,"撲":43,"斉":43,"旨":43,"柔":43,"沈":43,"沼":43,"泰":43,"滅":43,"滋":43,"炉":43,"琴":43,"寸":44,"竜":44,"縁":44,"翼":44,"吉":44,"刃":44,"忍":44,"桃":44,"辛":44,"謎":44,"侍":44,"俺":44,"叱":44,"娯":44,"斗":44,"朱":44,"丘":44,"梨":44,"僕":12,"匹":44,"叫":44,"釣":44,"髪":44,"嵐":44,"笠":44,"涙":44,"缶":44,"姫":44,"棚":44,"粒":44,"砲":44,"雷":44,"芽":44,"塔":44,"澄":45,"矛":45,"肌":45,"舟":45,"鐘":45,"凶":45,"塊":45,"狩":45,"頃":45,"魂":45,"脚":45,"也":45,"井":45,"呪":45,"嬢":45,"暦":45,"曇":45,"眺":45,"裸":45,"賭":45,"疲":45,"塾":45,"卓":45,"磨":45,"菌":45,"陰":45,"霊":45,"湿":45,"硬":45,"稼":45,"嫁":45,"溝":45,"滝":45,"狂":45,"翔":45,"墨":46,"鳩":46,"穏":46,"鈍":46,"魔":46,"寮":46,"盆":46,"棟":46,"吾":46,"斬":46,"寧":46,"椅":46,"歳":46,"涼":46,"猿":46,"瞳":46,"鍵":46,"零":46,"碁":46,"租":46,"幽":46,"泡":46,"癖":46,"鍛":46,"錬":46,"穂":46,"帝":46,"瞬":46,"菊":46,"誇":46,"庄":46,"阻":46,"黙":46,"俵":46,"綿":46,"架":46,"砕":47,"粘":47,"粧":47,"欺":47,"詐":47,"霧":47,"柳":47,"伊":47,"佐":47,"尺":47,"哀":47,"唇":47,"塀":47,"墜":47,"如":47,"婆":47,"崖":47,"帽":47,"幣":47,"恨":47,"憎":47,"憩":47,"扇":47,"扉":47,"挿":47,"掌":47,"滴":47,"炊":47,"爽":47,"畳":47,"瞭":47,"箸":47,"胴":47,"芯":47,"虹":47,"帳":48,"蚊":48,"蛇":48,"貼":48,"辱":48,"鉢":48,"闇":48,"隙":48,"霜":48,"飢":48,"餓":48,"畜":48,"迅":48,"騎":48,"蓄":48,"尽":48,"彩":48,"憶":48,"溶":48,"耐":48,"踊":48,"賢":48,"輝":48,"脅":48,"麻":48,"灯":48,"咲":48,"培":48,"悔":48,"脇":48,"遂":48,"班":48,"塗":48,"斜":48,"殴":48,"盾":48,"穫":48,"巾":47,"駒":49,"紫":49,"抽":49,"誓":49,"悟":49,"拓":49,"拘":49,"礎":49,"鶴":49,"刈":49,"剛":49,"唯":49,"壇":49,"尼":49,"概":49,"浸":49,"淡":49,"煮":49,"覆":49,"謀":49,"陶":49,"隔":49,"征":49,"陛":49,"俗":49,"桑":49,"潤":49,"珠":49,"衰":49,"奨":49,"劣":49,"勘":49,"妃":49,"丈":15,"峰":50,"巧":50,"邪":50,"駄":50,"唐":50,"廷":50,"鬱":50,"鰐":50,"蟹":50,"簿":50,"彰":50,"漫":50,"訂":50,"諮":50,"銘":50,"堰":50,"堤":50,"漂":50,"翻":50,"軌":50,"后":50,"奮":50,"亭":50,"仰":50,"伯":50,"偶":50,"淀":50,"墳":50,"壮":50,"把":50,"搬":50,"晶":50,"洞":50,"涯":50,"疫":50,"孔":46,"偉":51,"頂":51,"召":51,"挟":51,"枯":51,"沸":51,"濯":51,"燥":51,"瓶":51,"耕":51,"肯":51,"脂":51,"膚":51,"軒":51,"軟":51,"郊":51,"隅":51,"隻":51,"邸":51,"郡":51,"釈":51,"肪":51,"喚":51,"媛":51,"貞":51,"玄":51,"苗":51,"渦":51,"慈":51,"襟":51,"蓮":51,"亮":51,"聡":51,"浦":51,"塚":51,"陥":52,"貫":52,"覇":52,"呂":52,"茨":52,"擁":52,"孤":52,"賠":52,"鎖":52,"噴":52,"祥":52,"牲":52,"秩":52,"唆":52,"膨":52,"芳":52,"恒":52,"倫":52,"陳":52,"須":52,"偏":52,"遇":52,"糧":52,"殊":52,"慢":52,"没":52,"怠":52,"遭":52,"惰":52,"猟":52,"乃":52,"綾":52,"颯":52,"隼":52,"輔":52,"寛":53,"胞":53,"浄":53,"随":53,"稿":53,"丹":53,"壌":53,"舗":53,"騰":53,"緯":53,"艇":53,"披":53,"錦":53,"准":53,"剰":53,"繊":53,"諭":53,"惨":53,"虐":53,"据":53,"徐":53,"搭":53,"蒙":53,"鯉":53,"戴":53,"緋":53,"曙":53,"胡":53,"瓜":53,"帥":53,"啓":53,"葵":53,"駿":53,"諒":53,"莉":53,"鯨":54,"荘":54,"栽":54,"拐":54,"冠":54,"勲":54,"酬":54,"紋":54,"卸":54,"欄":54,"逸":54,"尚":54,"顕":54,"粛":54,"愚":54,"庶":54,"践":54,"呈":54,"疎":54,"疾":54,"謡":54,"鎌":54,"酷":54,"叙":54,"且":54,"痴":54,"呆":54,"哺":54,"傲":54,"茎":54,"阿":54,"悠":54,"杏":54,"茜":54,"栞":54,"伏":55,"鎮":55,"奉":55,"憂":55,"朴":55,"栃":55,"惜":55,"佳":55,"悼":55,"該":55,"赴":55,"髄":55,"傍":55,"累":55,"癒":55,"郭":55,"尿":55,"賓":55,"虜":55,"憾":55,"弥":55,"粗":55,"循":55,"凝":55,"脊":55,"昌":55,"旦":55,"愉":55,"抹":55,"栓":55,"之":55,"龍":55,"遼":55,"瑛":55,"那":55,"拍":56,"猶":56,"宰":56,"寂":56,"縫":56,"呉":56,"凡":56,"恭":56,"錯":56,"穀":56,"陵":56,"弊":56,"舶":56,"窮":56,"悦":56,"縛":56,"轄":56,"弦":56,"窒":56,"洪":56,"摂":56,"飽":56,"紳":56,"庸":56,"靖":56,"嘉":56,"搾":56,"蝶":56,"碑":56,"尉":56,"凛":56,"匠":56,"遥":56,"智":56,"柴":56,"賊":57,"鼓":57,"旋":57,"腸":57,"槽":57,"伐":57,"漬":57,"坪":57,"紺":57,"羅":57,"峡":57,"俸":57,"醸":57,"弔":57,"乙":57,"遍":57,"衡":57,"款":60,"閲":57,"喝":57,"敢":57,"膜":57,"盲":57,"胎":57,"酵":57,"堕":57,"遮":57,"烏":57,"凸":57,"凹":57,"楓":57,"哉":57,"蒼":57,"瑠":57,"萌":57,"硫":58,"赦":58,"窃":58,"慨":58,"扶":58,"戯":58,"忌":59,"濁":58,"奔":58,"肖":58,"朽":58,"殻":58,"享":58,"藩":58,"媒":58,"鶏":58,"嘱":58,"迭":58,"椎":58,"絹":58,"陪":58,"剖":58,"譜":58,"淑":58,"帆":58,"憤":58,"酌":58,"暁":58,"傑":58,"錠":58,"凌":58,"瑞":58,"菅":58,"漣":60,"璃":58,"遷":59,"拙":59,"峠":59,"篤":59,"叔":59,"雌":59,"堪":59,"吟":59,"甚":59,"崇":59,"漆":59,"岬":59,"紡":59,"礁":59,"屯":59,"姻":59,"擬":59,"睦":59,"閑":59,"曹":59,"詠":59,"卑":59,"侮":59,"鋳":59,"蔑":59,"胆":59,"浪":59,"禍":59,"酪":59,"憧":59,"慶":59,"亜":59,"汰":59,"梓":59,"沙":59,"逝":60,"匿":60,"寡":60,"痢":60,"坑":60,"藍":60,"畔":60,"唄":60,"拷":60,"渓":60,"廉":60,"謹":60,"湧":60,"醜":60,"升":60,"殉":60,"煩":60,"劾":60,"桟":60,"婿":60,"慕":60,"罷":60,"矯":60,"某":60,"囚":39,"泌":60,"漸":60,"藻":60,"妄":60,"蛮":60,"倹":60,"狐":60,"匂":30,"嬉":40,"嘘":41,"串":37,"喉":18,"叩":18,"飴":18,"噂":33,"諦":22,"捉":25,"膝":38,"眉":37,"濡":30,"痩":34,"羨":21,"慌":49,"挨":44,"拶":44,"斤":5,"袖":22,"凄":41,"妖":40,"喋":35,"鮭":36,"宛":39,"蹴":49,"喧":41,"嘩":41,"麺":40,"苺":14,"股":33,"柵":30,"噛":38,"狼":14,"咳":34,"拉":40,"苛":18,"煎":47,"戚":35,"餅":42,"屁":33,"璧":38,"痒":23,"冥":60,"莫":25,"頁":10,"勿":55}


  if (window.location.pathname === "/review") {
    const showWanikaniLevel = () => {
      setTimeout(() => {
        const kanjiList = document.querySelector(".subsection-composed-of-kanji > .subsection")?.children;
        console.log(kanjiList);
        if (kanjiList)
          for (const kanji of kanjiList) {
            const k = kanji.querySelector("a.plain")?.innerText;
            console.log(k);
            if (kanjis[k]) {
              kanji
                .querySelector(".description")
                ?.insertAdjacentHTML(
                  "beforeend",
                  ` <span style="opacity: 0.3; font-size: .8rem;">(${kanjis[k]})</span>`
                );
            }
          }
      }, 200);
    }

    const showAnswerButton = document.querySelector("#show-answer")
    
    if (showAnswerButton) {
      showAnswerButton.addEventListener("click", showWanikaniLevel);
    } else (
      showWanikaniLevel()
    )
  } else {
    const kanji = decodeURI(window.location.pathname).at(-1);
    const level = kanjis[kanji];
    if (level)
      document
        .querySelector(".subsection .cross-table tbody")
        .children[2].insertAdjacentHTML("afterend", `<tr><td>Wanikani</td><td>Level ${level}</td></tr>`);
  }
})();

