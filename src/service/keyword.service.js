import { keywordRepository } from "@/repository";
import { validateSchema } from '@/utils';

export const keywordService = {
    getUserKeywords: async (userId) => {
        try {
            return await keywordRepository.findUserKeywords(userId);
        } catch (error) {
            return { message: error.message }
        }
    },
    createUserKeyword: async (userId, keywordName) => {
        try {
            const validated = await validateSchema.keyword.validateAsync(keywordName);
            const keyword = await keywordRepository.findKeywordByName(validated.value);
            if (!keyword) {
                const newKeyword = await keywordRepository.createKeyword(validated.value);
                return await keywordRepository.associateKeywordToUser(userId, newKeyword.dataValues.keyword_id);
            }
            return await keywordRepository.associateKeywordToUser(userId, keyword.dataValues.keyword_id);
        } catch (error) {
            return { message: error.message }
        }
    },
    dissociateKeywordFromUser: async (userId, keywordName) => {
        try {
            const keyword = keywordRepository.findKeywordByName(keywordName);
            return await keywordRepository.dissociateKeywordFromUser(keyword.dataValues.keyword_id, userId);
        } catch (error) {
            return { message: error.message }
        }
    }
}