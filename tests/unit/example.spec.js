import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { FormItem, Input, Button, Form, Radio, RadioGroup, Container } from 'element-ui'
import App from '../../src/App.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(FormItem)
localVue.use(Input)
localVue.use(Button)
localVue.use(Form)
localVue.use(Radio);
localVue.use(RadioGroup);

const mountConfig = () => {
  return {
    localVue,
    stubs: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElButton: Button,
      ElRadioGroup: RadioGroup,
      ElRadio: Radio,
    },
    parentComponent: Container
  }
}

describe('App.vue', () => {
  afterEach(() => {
    wrapper?.destroy();
  })

  it('should show the error alert when user not input username', async () => {
    wrapper = shallowMount(App, mountConfig());

    const el = wrapper.findComponent({ name: 'ElInput' });
    el.element.value = ""
    el.vm.$emit('input', null);
    el.vm.$emit('blur');
    await wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');
    
    expect(wrapper.vm.form.username).to.equal(null);
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Please enter username');
  })

  it('should show the error alert when user not input password', async () => {
    const username = null; 

    wrapper = shallowMount(App, mountConfig());

    const els = wrapper.findAllComponents({ name: 'ElInput' });
    const el = els.at(1);

    // el.element.value = username;
    el.vm.$emit('input', username);
    el.vm.$emit('blur');
    await wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');
    
    expect(wrapper.vm.form.password).to.equal(null);
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Please enter password');
  })

  it('should not show the error alert when user input username', async () => {
    const username = "my username";

    wrapper = shallowMount(App, mountConfig());

    const el = wrapper.findComponent({ name: 'ElInput' });
    // el.element.value = username;
    el.vm.$emit('input', username);
    el.vm.$emit('blur');
    wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');

    expect(wrapper.vm.form.username).to.be.equal(username);
    expect(elErrorAlert.exists()).to.be.false;
  })

  it('should not show the error alert when user input password', () => {
    const password = "my passwrod";

    wrapper = shallowMount(App, mountConfig());

    const el = wrapper.findAllComponents({ name: 'ElInput' }).at(1);
    // el.element.value = password;
    el.vm.$emit('input', password);
    el.vm.$emit('blur');
    wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');

    expect(wrapper.vm.form.password).to.be.equal(password);
    expect(elErrorAlert.exists()).to.be.false;
  })

  it('should show error when username is "leminhcuong"', async () => {
    const username = "leminhcuong";

    wrapper = shallowMount(App, mountConfig());
    
    const el = wrapper.findComponent({ name: 'ElInput' });
    // el.element.value = username;
    el.vm.$emit('input', username);
    el.vm.$emit('blur');

    await wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');

    expect(wrapper.vm.form.username).to.equal(username);
    expect(elErrorAlert.exists()).to.be.true;
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Please enter another username');
  })

  it('should show error when username is "leminhcuong"', async () => {
    const username = "leminhcuong";

    wrapper = shallowMount(App, mountConfig());
    
    const el = wrapper.findComponent({ name: 'ElInput' });
    // el.element.value = username;
    el.vm.$emit('input', username);
    el.vm.$emit('blur');

    await wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');

    expect(wrapper.vm.form.username).to.equal(username);
    expect(elErrorAlert.exists()).to.be.true;
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Please enter another username');
  })

  it('should show error when sick was not choosen', async () => {
    // const value = ['No I am not', 'Yes I am', 'I do not remember']
    
    wrapper = shallowMount(App, mountConfig());

    const el = wrapper.findComponent({ name: 'ElRadioGroup' });
    el.vm.$emit('input', null);

    await wrapper.vm.$nextTick();

    const elErrorAlert = wrapper.find('.el-form-item__error');
    expect(elErrorAlert.exists()).to.be.true
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Please choose sick');
  })

  it('should show error when sick was choosen "Yes I am" as a value', async () => {
    const value = ['No I am not', 'Yes I am', 'I do not remember']
    
    wrapper = shallowMount(App, mountConfig());
    // console.log('wrapper.vm.$parent.$options.name', wrapper.vm.$parent.$options.name);
    // console.log('wrapper.html()', wrapper.html());

    const el = wrapper.findComponent({ name: 'ElRadioGroup' });
    el.vm.$emit('input', value[1]);

    await wrapper.vm.$nextTick();
    // console.log('wrapper.html()', wrapper.html());

    const elErrorAlert = wrapper.find('.el-form-item__error');
    expect(elErrorAlert.exists()).to.be.true
    expect(elErrorAlert.element.innerHTML.trim()).to.equal('Oh no !!!');
    expect(wrapper.vm.form.sick).to.equal(value[1]);
  })
})
