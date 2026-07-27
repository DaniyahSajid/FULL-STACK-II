import { createSelector } from "@reduxjs/toolkit";
import { postSelectors } from "./postSlice";

export const selectAllPosts = postSelectors.selectAll;

export const selectPostCount = createSelector(
    [selectAllPosts],
    (posts) => posts.length
);

export const selectTwitterPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "twitter"
        )
);

export const selectLinkedinPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "linkedin"
        )
);

export const selectInstagramPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "instagram"
        )
);