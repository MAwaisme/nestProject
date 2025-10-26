import { Module } from "@nestjs/common";
import { BookmarkServics } from "./bookmark.servics";


@Module({
    providers: [BookmarkServics]
})

export class BookmarkModule{}