import { createPage, defineUserConfig } from "vuepress";
export default defineUserConfig({
    async onPrepared(app) {
        console.log('hhh')
    }
})