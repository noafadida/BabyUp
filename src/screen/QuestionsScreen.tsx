import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const QuestionsScreen = ({ duration, complexity, affordability, style, textStyle }: any) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/pinkBack.jpeg')} resizeMode="cover" style={styles.image}>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>למי מיועדת האפליקציה BABYUP ? </Text>
                    <Text style={styles.answerText}>האפליקציה נועדה לספק כלים ומידע להורים צעירים ומנוסים כאחד שרוצים להאכיל את התינוקות שלהם במזון מזיו ואיכותי ביותר ואינם יודעים אילו מאכלים מכילים בתוכם את מרכיבי המזון הנצרכים להם. </Text>
                </View>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>למה האפליקציה מיועדת רק לטווח גילאים מסויים ? </Text>
                    <Text style={styles.answerText}>המערכת מותאמת החל מגיל חצי שנה בו מומלץ להתחיל בשלב הטעימות על פי משרד הבריאות, ועד לגיל שנה וחצי שבו לרוב הפעוט כבר אוכל כמעט הכל יחד עם הוריו. </Text>
                </View>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>כיצד נדע שהמתכונים המוצעים לנו הינם מומלצים ואיכותיים ? </Text>
                    <Text style={styles.answerText}>לכל המידע הניתן באפליקציה ישנה חומת מגן מקצועית חזקה ובטוחה, אשר במהלך כתיבתה נשענה על רופאים תזונתיים, מאמרים רפואיים, יועצות ואחיות. </Text>
                </View>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>כיצד ניתן לסנן את המתכונים לפי רגישויות התינוק ? </Text>
                    <Text style={styles.answerText}>בחלק העליון בעמוד שבו מופיעה רשימת המתכונים יש כפתור "סינון", לחיצה על הכפתור תוביל לפתיחת חלון שבו כל הורה יוכל לסמן וי בהתאם לרגישויות התינווק.</Text>
                </View>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>אם לאחר ההרשמה נודע כי לתינוק ישנה רגישות מסויימת כיצד נוכל להוסיף זאת לפרופיל האישי ? </Text>
                    <Text style={styles.answerText}>בעמוד הפרופיל מופיע כפתור "עריכת פרופיל", לחיצה על הכפתור תפתח חלון לעריכת הפרטים האישיים, שם ניתן גם לסמן מחדש את הרגישויות שישנן לתינוק.  </Text>
                </View>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}> האם ניתן להסיר מתכון מרשימת המועדפים לאחר שהוספנו אותו ? </Text>
                    <Text style={styles.answerText}>כן, ניתן לגשת ישירות לעמוד המתכון באמצעות לחיצה עליו דרך רשימת המועדפים או דרך הקטגוריה המתאימה למתכון, לאחר מכן ניתן ללחוץ פעם נוספת על האייקון שבצורת לב כך שכבר לא יהיה מודגש ובכך ניתן להסיר אותו מרשימת המועדפים.   </Text>
                </View>

            </ImageBackground>
        </View>
    )
}

export default QuestionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    questionContainer: {
        padding:10
    },
    questionText: {
        color: "white",
        marginBottom:2,
        fontSize: 16,
        fontWeight: "bold",
        textAlign:"right"
    },
    answerText: {
        color: "white",
        fontSize: 16,
        // fontWeight: "bold",
        textAlign:"right"
    }
})