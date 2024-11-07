// src/data.ts
export interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
}
export interface Article {
    id: number;
    title: string;
    tag: string[];
    createTime: string;
    content: string;
}
/**
 * 之后用后端返回
 */
export const songs: Song[] = [
    {
        id: 1,
        title: "Song 1",
        artist: "Artist 1",
        url: "/test1.mp3",
    },
    {
        id: 2,
        title: "Song 2",
        artist: "Artist 2",
        url: "/test2.mp3",
    },
    {
        id: 3,
        title: "Song 3",
        artist: "Artist 3",
        url: "https://example.com/song3.mp3",
    }
];
export const articles: Article[] = [
    {
        id: 1,
        title: "Article 1",
        tag: ["tag1", "tag2"],
        createTime: "2023-05-01",
        content:
            "### Hi there\n" +
            "I'm a software engineer with a passion for creating beautiful and functional websites. I have a strong background in web development and a commitment to delivering high-quality work.\n" +
            "\n" +
            "### Skills\n" +
            "- HTML5, CSS3, JavaScript\n" +
            "- React, Vue, Angular\n" +
            "- Node.js, Express\n" +
            "- Git, GitHub\n" +
            "- Responsive Design\n" +
            "- Web Accessibility\n" +
            "### Skills\n" +
            "- HTML5, CSS3, JavaScript\n" +
            "- React, Vue, Angular\n" +
            "- Node.js, Express\n" +
            "- Git, GitHub\n" +
            "- Responsive Design\n" +
            "- Web Accessibility\n" +
            "### Skills\n" +
            "- HTML5, CSS3, JavaScript\n" +
            "- React, Vue, Angular\n" +
            "- Node.js, Express\n" +
            "- Git, GitHub\n" +
            "- Responsive Design\n" +
            "- Web Accessibility\n" +
            "### Projects"
    },
    {
        id: 2,
        title: "Article 2",
        tag: ["tag3", "tag4"],
        createTime: "2023-05-02",
        content: `### 111 <!--more--> 222`
   },
]