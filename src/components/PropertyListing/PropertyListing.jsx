import React from 'react';
import PropertyCard from '../PropertyCard';
import useProperties from '../../hooks/useProperties';
import './PropertyListing.scss';

/**
 * PropertyListing
 *
 * Fetches and displays a list of property cards.
 * - Shows nothing while loading (you can swap in a <Loader /> if desired)
 * - Displays an error message if the fetch fails
 * - Renders the full list when data arrives
 * - Wrapped in React.memo to avoid unnecessary re‑renders
 */
const PropertyListing = () => {
  const { properties, isLoading, error } = useProperties();

  if (error) {
    return (
      <div role="alert">
        Sorry, we couldn’t load the listings. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return null;
  }

  return (
    <ul className="PropertyListing" role="list" aria-live="polite">
      {properties.map((property) => (
        <li
          key={property.id}
          role="listitem"
        >
          <PropertyCard {...property} />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(PropertyListing);
