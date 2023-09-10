import db from '@/database';
const { Preference } = db;

export const preferenceRepository = {
    getPreferences: async (userId) => {
        return await Preference.findOne({
            where: { user_id: userId },
            attributes: [
                'darkmodeStatus', 'neighborAlert', 
                'commentAlert', 'chatAlert'
            ]
        });
    },
    updatePreferences: async (userId, preferences) => {
        return await Preference.update(preferences, { where: { userId }});
    }
}