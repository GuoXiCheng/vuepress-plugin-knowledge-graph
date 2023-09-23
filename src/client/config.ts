import { defineClientConfig } from '@vuepress/client'
import TestComponent from './components/test.vue';
import { createApp, onMounted } from 'vue';

export default defineClientConfig({
    enhance({ app }) {

    },
    setup() {
        // 在组件挂载后执行 DOM 操作
        onMounted(() => {
            const headerElement = document.getElementsByTagName('header')[0];
            const newElement = document.createElement('div');
            headerElement.appendChild(newElement);

            // 在新元素上创建子组件
            const instance = createApp(TestComponent);
            instance.mount(newElement);
        });
    }
});
