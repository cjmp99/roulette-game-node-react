import cron from 'node-cron';
import { db } from "../../app";

export const earnTurns = (parseUser: FirebaseFirestore.DocumentData, active: boolean) => {
    const incrementClaim = cron.schedule('* * * * *', async () => {
        const existUser = await db.collection('users').doc(parseUser?.id).get()
        if (existUser.data()) {
            const objUser = {
                id: parseUser?.id,
                name: parseUser?.name,
                email: parseUser?.email,
                turns: existUser.data()?.turns + 1
            }
            await db.collection('users').doc(parseUser?.id).update(objUser);
        }
    })

    if(active){
        incrementClaim.start()
        console.log('start increment');
        
    }else{
        incrementClaim.stop()
        console.log('stop increment');
    }
}