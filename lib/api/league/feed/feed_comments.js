import axios from "axios";

class Comment {
    constructor({ date, userId, userName, userProfileUrl, comment }) {
        this.date = new Date(date);
        this.userId = userId;
        this.userName = userName;
        this.userProfilePicture = userProfileUrl;
        this.comment = comment;
    }
}

class FeedComments {
    constructor({ comments }) {
        this.comments = comments.map((comment) => new Comment(comment));
    }
}

export default async function getFeedComments(
    accessToken,
    leagueId,
    feedItemId
) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/feed/${feedItemId}/comments`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new FeedComments(data);
    } catch (err) {
        console.log(err);
    }
}
