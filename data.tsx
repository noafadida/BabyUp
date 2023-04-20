import { Category } from './src/models/category';
import Meal from './src/models/meal';

export const CATEGORIES = [
    new Category('c1', 'מתכונים לבוקר', '#FAFAFA'),
    new Category('c2', 'מתכונים לצהריים', '#FAFAFA'),
    new Category('c3', 'מתכונים לערב', '#FAFAFA'),
    new Category('c4', 'הטיפים שלנו במיוחד בשבילכם !', '#FAFAFA'),

];

export const MEALS = [
    new Meal(
        'm1',
        ['c1', 'c3'],
        '   יוגורט עם בננה, תפוח ושיבולת שועל',
        'קל להכנה',
        ' מהיר',
        'https://www.nestlebabyandme.co.il/sites/default/files/styles/content_media_desktop/public/content_image/yvgvrt_bnnh_tpvkh_vshybvlt_shvl.webp?itok=2HnBvYLF',
        10,
        [
            'יוגורט 1',
            '1 בננה',
            '1 תפוח',
            'שיבולת שועל',
            'סילאן',

        ],
        [
            'חותכים את הבננה והתפוח לחתיכות, מכניסים לקערית עם יוגורט.',
            'מוסיפים מעט פתיתי שיבולת שועל ומערבבים. יוצקים מעל סילאן [לא חובה] ומגישים.',
        ],
        false,
        true,
    ),

    new Meal(
        'm2',
        ['c1', 'c3'],
        'קערת דייסת דגנים',
        'קל להכנה',
        ' מהיר',
        'https://www.nestlebabyandme.co.il/sites/default/files/styles/content_media_desktop/public/content_image/qrt_dyyst_dgnym.webp?itok=abfxDz3Q',
        15,
        [
            '180 מ"ל תמ"ל לפי הוראות היצרן',
            '4 כפות מטבח מלאות של דייסת דגנים ייעודית לתינוקות',
        ],
        [
            'יוצקים את התמ"ל לקערה.',
            'מוסיפים 4 כפות מטבח מלאות של דייסת דגניםייעודית לתינוקות.',
            'בוחשים וממתינים מעט עד להסמכת הדייסה. '
        ],
        false,
        false,
    ),

    new Meal(
        'm3',
        ['c1'],
        'פנקייק תפוח עץ מוגש עם גבינה לבנה וממרח חמאת בוטנים',
        'בינוני',
        'מהיר יחסית',
        'https://www.nestlebabyandme.co.il/sites/default/files/styles/content_media_desktop/public/content_image/pnqyyq_tpvkhym.webp?itok=KnFkmIaP',
        20,
        [
            '1/2 כוס קמח לבן',
            '1/2 כוס קמח מלא',
            '1 צנצנת מחית תפוחי עץ  גרבר',
            '1 כוס חלב',
            'Ketchup',
            '2 ביצים'
        ],
        [
            'מערבבים את החומרים היטב עד לקבלת בלילה אחידה.',
            'מחממים מחבת טפלון ומשמנים קלות במעט שמן.',
            'בעזרת מצקת יוצקים מהבלילה למחבת החמה, הופכים לאחר כדקה עד שתיים עד לקבלת פנקייקס זהובים.',
            'ניתן להגיש לצד כף גבינה לבנה וכף חמאת בוטנים.',
            'פנקייק היא דרך נהדרת לשלב חלבון וסידן בתפריט.'
        ],
        false,
        false,
    ),

    new Meal(
        'm4',
        ['c2'],
        'מרק עוף עם ירקות ואטריות',
        'פשוט',
        'זמן בינוני',
        'https://www.nestlebabyandme.co.il/sites/default/files/styles/content_media_desktop/public/content_image/mrq_vp_m_yrqvt_vtryvt.webp?itok=GLsxSVvl',
        35,
        [
            ' קוסקוס או אטריות,',
            '1 גזר',
            '1 תפו"א',
            ' גבעולי סלרי',
            '1 בצל',
            '1 דלעת ',
            'כרעיים עוף מחולק',
            'פטרוזיליה',
            'שמיר',
            '4 כוסות מים'
        ],
        [
            'מכינים בנפרד את הקוסקוס או האיטריות לפי הוראות היצרן. ',
            'חותכים את הירקות לקוביות.',
            'Lightly coat the cutlets in flour then dip into the egg, and finally, coat in breadcrumbs.',
            'כניסים את כל החומרים לסיר ומביאים להרתחה. מעבירים לאש נמוכה לעוד כשעה.',
            'להוסיף את האטריות או הקוסקוס למרק המוכן. מוסיפים תבלינים לפי הצורך.',
            'הקפידו על ארוחות משפחתיות גם במהלך ימות השבוע כדי להקנות הרגלי תזונה בריאים. ',

        ],
        false,
        false,
    ),

    new Meal(
        'm5',
        ['c2'],
        'קציצות בקר עם אפונת גינה',
        'קל',
        'זמן בינוני',
        'https://www.nestlebabyandme.co.il/sites/default/files/styles/content_media_desktop/public/content_image/qtsytsvt_m_pvnh.webp?itok=U3Nb1owh',
        35,
        [
            'לתערובת הקציצות:',
            '1/2 ק"ג בשר בקר טחון',
            "1 גזר מגורר",
            '1 קישוא מגורר',
            '1 תפוח אדמה מגורר',
            ' בצל מגורר 1 ',
            'צרור פטרוזיליה',
            '1 כף שמן זית',
            '2 כפות פירורי לחם',
            '1 ביצה',
            'קורט פלפל שחור',
            '',
            'לרוטב:',
            'כף שמן זית',
            'חבילת אפונת גינה מוקפאת',
            'כורכום'
        ],
        [
            'לקציצות:',
            'מערבבים את כל החומרים בקערה ויוצרים קציצות.',
            'שמים במחבת רחבה עם מכסה מעט שמן זית מוסיפים כורכום וכוס מים ומביאים לרתיחה.',
            'מכניסים את הקציצות לרוטב ומוסיפים את אפונת הגינה לאחר כרבע שעה.',
            'מבשלים  כ-10 דקות נוספות על אש קטנה. להגיש לצד אורז.'
        ],
        true,
        false,
    ),
];