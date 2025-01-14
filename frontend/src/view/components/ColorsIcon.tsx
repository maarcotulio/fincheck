interface ColorIconProps {
  color: string;
  bg: string;
}

export function ColorIcon({ color, bg }: ColorIconProps) {
  return (
    <svg
      width="42"
      height="48"
      viewBox="0 0 42 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4.5" y="7.5" width="33" height="33" rx="16.5" fill={bg} />
      <rect x="4.5" y="7.5" width="33" height="33" rx="16.5" stroke="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5146 18.499H20.5612C20.7279 18.499 20.9012 18.579 21.0412 18.7123L25.7612 23.4323L26.2812 23.9589C26.4346 24.1123 26.5146 24.3056 26.4946 24.4856C22.4146 24.3456 20.6546 22.579 20.5146 18.499ZM27.3612 23.7989C27.2812 23.5989 27.1546 23.4123 26.9879 23.2523L21.7479 18.0056C21.5946 17.859 21.4212 17.739 21.2412 17.6523C21.2212 17.6456 21.2079 17.639 21.1879 17.6323C21.1612 17.619 21.1346 17.6056 21.1079 17.6056C20.8879 17.519 20.6612 17.4856 20.4279 17.5056C17.0546 17.8056 14.4546 20.6923 14.5012 24.0789C14.5479 27.5723 17.4279 30.4523 20.9146 30.4989H21.0079C24.3546 30.4989 27.1946 27.9123 27.4946 24.5723C27.5146 24.3123 27.4746 24.0456 27.3612 23.7989Z"
        fill={color}
      />
    </svg>
  );
}
