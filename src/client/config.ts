import { defineClientConfig } from '@vuepress/client'
import TestComponent from './components/test.vue';
import { createApp } from 'vue';

export default defineClientConfig({
    enhance({ app }) {

    },
    setup() {
        setTimeout(()=>{
            const headerElement = document.getElementsByTagName('header')[0];
            const newElement = document.createElement('div');
            headerElement.appendChild(newElement);
            const instance = createApp(TestComponent);
            instance.mount(newElement);
        }, 1000)

    }
  });
  