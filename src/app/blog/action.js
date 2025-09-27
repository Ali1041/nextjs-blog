"use server"

const ITEMS_PER_PAGE = 6

export async function getPosts(page = 1) {
    const response = await fetch(`http://localhost:3000/api/posts`)
    const allPosts = await response.json()

    const start = (page - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    const posts = allPosts.slice(start, end)
    const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE)

    return {
        posts,
        totalPages,
    }
}
