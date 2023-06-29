import { AvatarPathProps } from "../Avatar";

export const PersonF = ({ color, hasCrown }: AvatarPathProps) => {
  let path;
  switch (color) {
    // Green color
    case "green":
      path = hasCrown ? (
        <g>
          <path
            d="M30 20V35H25.05V30H20V35.05H25V45.05H30V50.05H40.05V45.05H45.05V35H40V45H30.05V40.05H35.05V30.05H45.05V25H40.05V20H30Z"
            fill="#0FD976"
          />
          <path d="M25 20H30.05V30.05H25V20Z" fill="#00743E" />
          <path d="M35 30H40.05V40.05H35V30Z" fill="#00743E" />
          <path d="M30.05 45H25V60.05H40.05V50H30.05V45Z" fill="#00743E" />
          <path d="M45.05 20H40V25.05H45.05V20Z" fill="#00743E" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.05 0H20V5H15V10H10V35.05H15V40.05H20V45.05H25.05V35.05H30.05V30H25.05V20.05H45V30H40V35.05H45.05V30.05H50.05V25.05H55.05V10H50.05V5H45.05V0ZM25 30.05H20.05V35H25V30.05Z"
            fill="#114329"
          />
          <path d="M20 55H15V60.05H25.05V50H20V55Z" fill="#114329" />
          <path d="M30 40H40.05V45.05H30V40Z" fill="#114329" />
          <path d="M45.05 50H40V60.05H50.05V55H45.05V50Z" fill="#114329" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.05 5H50.05V25H15.05V5ZM45.0415 10.0075H40.0529V15.005H35.0443V10.0075H30.0558V15.005H25.0472V10.0075H20.0586V19.9925H45.0415V10.0075Z"
            fill="#172217"
          />
          <path
            d="M25.0572 9.99756H20.0486V20.0026H45.0514V9.99756H40.0429V14.9951H35.0543V9.99756H30.0457V14.9951H25.0572V9.99756Z"
            fill="#11ED83"
          />
        </g>
      ) : (
        <g>
          <path
            d="M30 20V35H25.05V30H20V35.05H25V45.05H30V50.05H40.05V45.05H45.05V35H40V45H30.05V40.05H35.05V30.05H45.05V25H40.05V20H30Z"
            fill="#0FD976"
          />
          <path d="M25 20H30.05V30.05H25V20Z" fill="#00743E" />
          <path d="M35 30H40.05V40.05H35V30Z" fill="#00743E" />
          <path d="M30.05 45H25V60.05H40.05V50H30.05V45Z" fill="#00743E" />
          <path d="M45.05 20H40V25.05H45.05V20Z" fill="#00743E" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.05 0H20V5H15V10H10V35.05H15V40.05H20V45.05H25.05V35.05H30.05V30H25.05V20.05H45V30H40V35.05H45.05V30.05H50.05V25.05H55.05V10H50.05V5H45.05V0ZM25 30.05H20.05V35H25V30.05Z"
            fill="#114329"
          />
          <path d="M20 55H15V60.05H25.05V50H20V55Z" fill="#114329" />
          <path d="M30 40H40.05V45.05H30V40Z" fill="#114329" />
          <path d="M45.05 50H40V60.05H50.05V55H45.05V50Z" fill="#114329" />
        </g>
      );
      break;
    // Yellow color
    case "yellow":
      path = hasCrown ? (
        <g>
          <path
            d="M30 20V35H25.05V30H20V35.05H25V45.05H30V50.05H40.05V45.05H45.05V35H40V45H30.05V40.05H35.05V30.05H45.05V25H40.05V20H30Z"
            fill="#FDE092"
          />
          <path d="M25 20H30.05V30.05H25V20Z" fill="#A78C44" />
          <path d="M35 30H40.05V40.05H35V30Z" fill="#A78C44" />
          <path d="M30.05 45H25V60.05H40.05V50H30.05V45Z" fill="#A78C44" />
          <path d="M45.05 20H40V25.05H45.05V20Z" fill="#A78C44" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.05 0H20V5H15V10H10V35.05H15V40.05H20V45.05H25.05V35.05H30.05V30H25.05V20.05H45V30H40V35.05H45.05V30.05H50.05V25.05H55.05V10H50.05V5H45.05V0ZM25 30.05H20.05V35H25V30.05Z"
            fill="#5E4E26"
          />
          <path d="M20 55H15V60.05H25.05V50H20V55Z" fill="#5E4E26" />
          <path d="M30 40H40.05V45.05H30V40Z" fill="#5E4E26" />
          <path d="M45.05 50H40V60.05H50.05V55H45.05V50Z" fill="#5E4E26" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 5H50.05V25H15V5ZM45.0343 10.0075H40.0386V15.005H35.0229V10.0075H30.0272V15.005H25.0114V10.0075H20.0157V19.9925H45.0343V10.0075Z"
            fill="#172217"
          />
          <path
            d="M25.0278 9.99756H20.0134V20.0026H45.0455V9.99756H40.0311V14.9951H35.0367V9.99756H30.0223V14.9951H25.0278V9.99756Z"
            fill="#FBCB4A"
          />
        </g>
      ) : (
        <g>
          <path
            d="M30 20V35H25.05V30H20V35.05H25V45.05H30V50.05H40.05V45.05H45.05V35H40V45H30.05V40.05H35.05V30.05H45.05V25H40.05V20H30Z"
            fill="#FDE092"
          />
          <path d="M25 20H30.05V30.05H25V20Z" fill="#A78C44" />
          <path d="M35 30H40.05V40.05H35V30Z" fill="#A78C44" />
          <path d="M30.05 45H25V60.05H40.05V50H30.05V45Z" fill="#A78C44" />
          <path d="M45.05 20H40V25.05H45.05V20Z" fill="#A78C44" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M45.05 0H20V5H15V10H10V35.05H15V40.05H20V45.05H25.05V35.05H30.05V30H25.05V20.05H45V30H40V35.05H45.05V30.05H50.05V25.05H55.05V10H50.05V5H45.05V0ZM25 30.05H20.05V35H25V30.05Z"
            fill="#5E4E26"
          />
          <path d="M20 55H15V60.05H25.05V50H20V55Z" fill="#5E4E26" />
          <path d="M30 40H40.05V45.05H30V40Z" fill="#5E4E26" />
          <path d="M45.05 50H40V60.05H50.05V55H45.05V50Z" fill="#5E4E26" />
        </g>
      );
      break;
  }
  return path;
};
