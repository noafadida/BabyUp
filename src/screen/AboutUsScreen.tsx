import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const AboutUsScreen = ({ duration, complexity, affordability, style, textStyle, }: any) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                מתי בפעם האחרונה רצית להכין ארוחה מזינה וטעימה לתינוקך אך לא באמת ידעת איזה מאכל יכיל את מיטב מרכיבי המזון הנצרכים בדיוק בשבילו? סביר להניח שהנך נתקל בזה מדי יום.
                כמה אהבה משקיעה האם בהכנת האוכל לתינוקה? באיזו צפייה ודריכות מתבוננים ההורים בילדם בזמן האכילה, האם ייהנה ויאכל לשמחתם, או ידחה את הארוחה למגינת ליבם?
            </Text>
            <Text style={styles.text}>
                חשיבות רבה מלווה ברגש רב מייחסים ההורים לתזונה של ילדיהם,  ולא בכדי: תזונה, יודע כל הורה, היא דבר חשוב. אך אצל פעוטות החשיבות עולה עוד יותר.
            </Text>
            <Text style={styles.text}>
                האפליקציה מבוססת על העובדה שישנם מזונות שיעשו את העבודה טוב יותר מאחרים. עם זאת, יש לשמור על כללי הזנה נכונים, בעיקר בשלבי חייו הראשונים של התינוק ,להימנע מחשיפתו המוקדמת למוצרי מזון יוצרי אלרגיה, כאלה שמערכת העיכול עדיין אינה בשלה עבורם, וכמובן להיזהר מחשיפה למוצקים העלולים- אם הם מוגשים בשלב מוקדם מידי-לגרום לסכנת חיים.
            </Text>
            <View style={styles.bottomContainer}>
                <Text style={styles.textDown}>
                    האפליקציה נועדה לתת כלים ומידע להורים צעירים ומנוסים כאחד הרוצים להאכיל את התינוקות שלהם במזון המזין והטוב ביותר החל מהביס הראשון.
                    המערכת מותאמת החל מגיל חצי שנה בו מומלץ להתחיל בשלב הטעימות על פי המלצת משרד הבריאות, ועד לגיל שנה וחצי.
                </Text>
            </View>
        </View>
    )
}

export default AboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40
    },
    text: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
        color: "#FF597B"
    },
    textDown: {
        textAlign: "center",
        fontSize: 16,
        color: GlobalStyles.colors.appBodyBackColor,
        
    },
    bottomContainer: {
        marginTop: 30,
        padding:8,
        borderRadius: 10,
        backgroundColor: "#FF597B",
    }
})