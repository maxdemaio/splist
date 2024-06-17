export const Icons = {
  profileDefault: function ProfileDefaultIcon(props: any) {
    return (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_23_90)">
          <path
            d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
            fill="#528EA1"
          />
        </g>
        <defs>
          <clipPath id="clip0_23_90">
            <rect width="50" height="50" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },

  copy: function CopyIcon(props: any) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"
        />
      </svg>
    );
  },

  loading: function LoadingIcon(props: any) {
    return (
      <svg
        className="animate-spin h-5 w-5 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  },
  splist: function SplistIcon(props: any) {
    return (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6C0 2.68629 2.68629 0 6 0H74C77.3137 0 80 2.68629 80 6V74C80 77.3137 77.3137 80 74 80H6C2.68629 80 0 77.3137 0 74V6Z"
          fill="#171717"
        />
        <path
          d="M28.62 39.39C32.42 42.3 35.78 45.8 40.08 48.03C46.3 51.26 54.23 51.44 60.61 48.5C57.13 47.57 52.98 47.24 49.83 45.29C45.5 42.6 44.23 39.16 40.01 36.34C36.95 34.3 33.27 33.14 29.52 32.89C26.98 32.72 20.95 32.95 17.24 34.46C21.62 35.21 25.16 36.73 28.62 39.39Z"
          fill="url(#paint0_linear_66_319)"
        />
        <path
          opacity="0.33"
          d="M20.05 47.09L44.18 59.93L74.99 32.79L20.99 8.34998L20.05 47.09Z"
          fill="url(#paint1_linear_66_319)"
        />
        <path
          d="M24.7501 51.25C27.9901 53.73 30.8501 56.71 34.5201 58.62C39.8201 61.37 46.5701 61.53 52.0101 59.02C49.0501 58.23 45.5101 57.95 42.8301 56.29C39.1401 54 38.0601 51.07 34.4601 48.66C31.8601 46.92 28.7101 45.93 25.5301 45.72C23.3701 45.58 18.2301 45.77 15.0601 47.06C18.7901 47.7 21.8001 49 24.7601 51.26L24.7501 51.25Z"
          fill="#CEF2D0"
        />
        <path
          d="M33.3801 24.42C37.8301 27.83 41.76 31.92 46.8 34.54C54.08 38.32 63.3601 38.54 70.8301 35.09C66.7601 34 61.9 33.62 58.21 31.33C53.14 28.18 51.66 24.16 46.71 20.85C43.13 18.46 38.8101 17.1 34.43 16.81C31.46 16.61 24.4 16.88 20.05 18.65C25.18 19.53 29.3201 21.31 33.3801 24.42Z"
          fill="url(#paint2_linear_66_319)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_66_319"
            x1="58.8277"
            y1="53.3879"
            x2="22.4643"
            y2="31.6403"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.14" stop-color="#39B54A" />
            <stop offset="0.77" stop-color="#9AE5A1" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_66_319"
            x1="48.79"
            y1="18.96"
            x2="31.1"
            y2="54.65"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.31" stop-color="white" stop-opacity="0" />
            <stop offset="0.86" stop-color="white" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_66_319"
            x1="68.7562"
            y1="40.8039"
            x2="26.1799"
            y2="15.3509"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.31" stop-color="#39B55B" />
            <stop offset="0.86" stop-color="#75DB7E" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
};
