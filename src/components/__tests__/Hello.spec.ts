import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Hello from '../Hello.vue'

describe('Hello',  () => {

  it('emit events when the name is set',  async () => {
    const wrapper = mount(Hello);

    const input = wrapper.get('input');
    await input.setValue("John Doe");
    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.$data.buttonDisabled).toBe(false);
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('hideMe');
  });

  it('should test button is disabled when no name  ',  async () => {
    const wrapper = mount(Hello);

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.$data.buttonDisabled).toBe(true);
    expect(wrapper.emitted()).not.toHaveProperty('hideMe');

  });


})
