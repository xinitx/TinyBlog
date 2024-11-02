// src/data.ts
export interface Song {
    id: number;
    title: string;
    artist: string;
    url: string;
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
