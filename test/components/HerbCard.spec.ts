import type { Herb } from '@/types/Herb';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HerbCard from '@/components/HerbCard.vue';

describe('herbCard.vue', () => {
  const mockHerb: Herb = {
    ID: 1,
    Name: 'Fah Talai Jone',
    Description: 'A very long description that should be truncated because it exceeds the limit set in the component logic which is eighty characters.',
    Usage: 'Take it',
    Category: 'Cooling',
    NHSO_Price: '100',
    Per_Course: '1',
    ICD10: 'A00',
    ImageUrl: 'test.jpg',
  };

  it('renders herb information correctly', () => {
    const wrapper = mount(HerbCard, {
      props: { herb: mockHerb },
    });

    expect(wrapper.text()).toContain('Fah Talai Jone');
    expect(wrapper.text()).toContain('Cooling');
    expect(wrapper.text()).toContain('100');
  });

  it('truncates long description', () => {
    const wrapper = mount(HerbCard, {
      props: { herb: mockHerb },
    });

    expect(wrapper.text()).toContain('...');
  });
});
