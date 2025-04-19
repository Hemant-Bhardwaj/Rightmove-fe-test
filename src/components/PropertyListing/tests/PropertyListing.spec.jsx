// src/components/__tests__/PropertyListing.test.jsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import PropertyListing from '../PropertyListing';

describe('PropertyListing', () => {
  const makeProperties = (n) =>
    Array.from({ length: n }, (_, i) => ({
      id: i,
      bedrooms: 2,
      summary: `Summary ${i}`,
      displayAddress: `Address ${i}`,
      propertyType: 'Flat',
      price: 100000 + i,
      branchName: 'Test Branch',
      propertyUrl: '/property-url',
      contactUrl: '/contact-url',
      propertyTitle: `Title ${i}`,
      mainImage: 'test.jpg',
    }));

  beforeEach(() => {
    const DUMMY_PROPERTIES = makeProperties(5);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => DUMMY_PROPERTIES,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders exactly as many cards as the API returns', async () => {
    render(<PropertyListing />);

    // Wait for the list to render once fetch() resolves
    const list = await screen.findByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(5);
  });
});
