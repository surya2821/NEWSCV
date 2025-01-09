"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twitter_api_v2_1 = require("twitter-api-v2");
const app = (0, express_1.default)();
// Replace with your actual Bearer Token from the Twitter Developer Portal
const twitterClient = new twitter_api_v2_1.TwitterApi('AAAAAAAAAAAAAAAAAAAAAAQHyAEAAAAASrNawQlMvRPb2d6uFn9Mu6CIbyY%3DWMAmqfYu4HFevbYRCHhlIbFAaagLRR1KerT4uAHC7J7jUOM9oe');
app.get('/api/twitter-cricket', async (req, res) => {
    const { query, max_results } = req.query;
    try {
        // Fetch tweets from Twitter API
        const tweetsResponse = await twitterClient.v2.search(query, {
            'tweet.fields': 'created_at',
            expansions: 'author_id',
            max_results: parseInt(max_results, 10) || 10,
            'user.fields': 'name,username,profile_image_url',
        });
        // Check if the response has the "data" property
        const tweets = tweetsResponse.data || [];
        const users = tweetsResponse.includes?.users || [];
        // Format tweets with user details
        const formattedTweets = ((tweet) => {
            const user = users.find((u) => u.id === tweet.author_id);
            return {
                id: tweet.id,
                text: tweet.text,
                created_at: tweet.created_at,
                user: {
                    name: user?.name || 'Unknown',
                    username: user?.username || 'unknown',
                    profile_image_url: user?.profile_image_url || '',
                },
            };
        });
        res.json({ data: formattedTweets });
    }
    catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
