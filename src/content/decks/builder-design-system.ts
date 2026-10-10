// Generated from Muskan's Figma case study (Builder Design System). Text is hers, verbatim; visuals are crops of her slides.
import type { Deck } from "./types";

export const deck: Deck = [
  {
    "id": "130:1102",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "Quick Overview ✏️"
      },
      {
        "kind": "p",
        "text": "A new cohesive design system for all Builder products experience."
      },
      {
        "kind": "facts",
        "facts": [
          {
            "label": "Status",
            "value": "In progress"
          },
          {
            "label": "Tools",
            "value": "Figma"
          },
          {
            "label": "Deliverables",
            "value": "Component Library"
          },
          {
            "label": "Timeline",
            "value": "05 May 2024 - Present"
          }
        ]
      }
    ]
  },
  {
    "id": "130:1127",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "Meet the team"
      },
      {
        "kind": "team",
        "members": [
          {
            "name": "Chandan Kumar",
            "role": "Head of Design",
            "photo": "/work/team/chandan.webp"
          },
          {
            "name": "Muskan Bhatia",
            "role": "Product designer",
            "photo": "/work/team/muskan-ds.webp"
          },
          {
            "name": "7 Designers",
            "role": "Design team"
          }
        ]
      },
      {
        "kind": "facts",
        "facts": [
          {
            "label": "My role",
            "value": "Product designer"
          }
        ]
      },
      {
        "kind": "sub",
        "text": "What I did"
      },
      {
        "kind": "list",
        "items": [
          "Helped the design team with Head of design to build the design system",
          "Created complex components like Cards, AI experience, Navigation etc."
        ]
      }
    ]
  },
  {
    "id": "130:1173",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "The Problem?"
      },
      {
        "kind": "highlight",
        "text": "How Might We Create a Unified Design System to Harmonize Builder.ai's Diverse Product Suite?"
      },
      {
        "kind": "p",
        "text": "Builder.ai currently offers a suite of 10+ products, each designed independently by different designers. Due to the lack of a unified design system, these products exhibit significant inconsistencies in their user interfaces, interactions, and overall user experience. This fragmentation not only undermines brand identity but also leads to increased development time, higher maintenance costs, and a steep learning curve for users navigating between products. To address these challenges, there is a pressing need to establish a cohesive design system that ensures consistency, enhances usability, and streamlines the design and development process across all Builder.ai products."
      },
      {
        "kind": "p",
        "text": "To resolve the design inconsistencies across Builder.ai's 10+ products, we are developing and a unified design system. This system will standardize visual elements, components, and interactions, ensuring consistency, improving efficiency, enhancing usability, and reducing development costs. Ultimately, it will create a cohesive user experience across all products, strengthening Builder.ai's brand identity and supporting future growth."
      }
    ]
  },
  {
    "id": "130:1201",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "Foundations"
      },
      {
        "kind": "sub",
        "text": "Spacing"
      },
      {
        "kind": "p",
        "text": "Just as you wouldn’t build a house without laying a solid foundation, the same principle applies to design systems. Our foundation is the spacing, Color, Icons and Typography. Spacing often overlooked, play a critical role in defining the look and feel of a design."
      },
      {
        "kind": "pieces",
        "w": 1124,
        "h": 904,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/var-spacing.webp",
            "x": 0,
            "y": 0,
            "w": 410,
            "h": 765,
            "radius": 12,
            "alt": "Figma variables panel: Spacing/Padding tokens from 2px to 128px"
          },
          {
            "src": "/work/builder-design-system/ds/spacing-scale.svg",
            "x": 508,
            "y": 0,
            "w": 164,
            "h": 904,
            "alt": "Spacing scale from 2px to 128px"
          },
          {
            "src": "/work/builder-design-system/ds/corner-radius.svg",
            "x": 770,
            "y": 1,
            "w": 354,
            "h": 770,
            "alt": "Corner radius tokens from Corner 8 to Corner 128"
          }
        ]
      }
    ]
  },
  {
    "id": "130:1295",
    "side": "text",
    "items": [
      {
        "kind": "sub",
        "text": "Typography"
      },
      {
        "kind": "p",
        "text": "We selected Typephase Pro for this system because of its clean, geometric letterforms and well-balanced character spacing. Its versatility is ideal for SaaS applications, offering multiple weight variations that make it equally effective as both a heading font and body text. This ensures a cohesive and polished look throughout the design."
      },
      {
        "kind": "pieces",
        "w": 1215,
        "h": 978,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/type-body.webp",
            "x": 61,
            "y": 86,
            "w": 716,
            "h": 319,
            "alt": "Body type styles: Base Large, Base, Base Small"
          },
          {
            "src": "/work/builder-design-system/ds/type-heading.webp",
            "x": 212,
            "y": 405,
            "w": 658,
            "h": 499,
            "alt": "Heading type styles: Heading 1 to Heading 6"
          },
          {
            "src": "/work/builder-design-system/ds/type-display.webp",
            "x": 557,
            "y": 0,
            "w": 658,
            "h": 600,
            "alt": "Display type styles: Display 1 to Display 4"
          },
          {
            "src": "/work/builder-design-system/ds/type-label.webp",
            "x": 454,
            "y": 681,
            "w": 716,
            "h": 246,
            "alt": "Label type styles"
          },
          {
            "src": "/work/builder-design-system/ds/var-type.webp",
            "x": 0,
            "y": 563,
            "w": 486,
            "h": 415,
            "radius": 24,
            "shadow": true,
            "alt": "Figma variables panel: typography tokens"
          }
        ]
      }
    ]
  },
  {
    "id": "130:1525",
    "side": "stack",
    "items": [
      {
        "kind": "sub",
        "text": "Iconography"
      },
      {
        "kind": "p",
        "text": "In Builder.ai, icons serve as visual aids that guide users through tasks. For the BLOCK design system, we chose the Blank UI icon library for its simplicity and clarity, which align seamlessly with our overall visual language. We prioritized a straightforward icon set to reduce cognitive load, ensuring that users can quickly grasp the meaning of each icon, even on smaller screens. This focus on simplicity enhances usability and helps users navigate the interface with ease."
      }
    ],
    "img": {
      "src": "/work/builder-design-system/ds/icons.webp",
      "width": 1098,
      "height": 794,
      "alt": "Icon library: General set"
    }
  },
  {
    "id": "130:2502",
    "side": "text",
    "items": [
      {
        "kind": "sub",
        "text": "Colors"
      },
      {
        "kind": "p",
        "text": "Although we appreciate the aesthetic appeal of color, we prioritize clear communication above all. Color in our design system is not just about appearance; it serves to convey hierarchy, indicate interactive states, and differentiate elements. We believe colors should be selected with intention and purpose, not based on personal preference. In BLOCK, every color is assigned a specific role, carrying meaning based on its function within the interface. This approach simplifies future modifications and customization while ensuring that the color system remains consistent across multiple touchpoints."
      },
      {
        "kind": "pieces",
        "w": 977,
        "h": 795,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/col-found.webp",
            "x": 0,
            "y": 0,
            "w": 468,
            "h": 311,
            "radius": 7,
            "alt": "Foundational colours"
          },
          {
            "src": "/work/builder-design-system/ds/col-sem.webp",
            "x": 499,
            "y": 3,
            "w": 474,
            "h": 308,
            "radius": 9,
            "alt": "Semantic colours"
          },
          {
            "src": "/work/builder-design-system/ds/col-basic.webp",
            "x": 0,
            "y": 347,
            "w": 682,
            "h": 190,
            "radius": 6,
            "alt": "Basic colours: text, icon, background, border"
          },
          {
            "src": "/work/builder-design-system/ds/col-basic2.webp",
            "x": 712,
            "y": 347,
            "w": 265,
            "h": 445,
            "radius": 6,
            "alt": "Basic colours"
          },
          {
            "src": "/work/builder-design-system/ds/col-grad.webp",
            "x": 1,
            "y": 573,
            "w": 682,
            "h": 222,
            "radius": 7,
            "alt": "Gradients"
          },
          {
            "src": "/work/builder-design-system/ds/var-colors.webp",
            "x": 216,
            "y": 212,
            "w": 550,
            "h": 393,
            "radius": 12,
            "shadow": true,
            "alt": "Figma variables panel: colour tokens"
          }
        ]
      }
    ]
  },
  {
    "id": "130:3285",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "Components"
      },
      {
        "kind": "sub",
        "text": "Buttons"
      },
      {
        "kind": "p",
        "text": "While buttons are a familiar element, non designers may not realise that each button can have multiple states, such as active, hover, focus, and disabled. Our design system categories buttons into 6 types: Primary, Secondary, Tertiary, Quaternary and Natasha(AI), each with its own icon version. Below, you can see examples of buttons in various states to illustrate their functionality."
      },
      {
        "kind": "pieces",
        "w": 1880,
        "h": 629,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/buttons.webp",
            "x": 326,
            "y": 0,
            "w": 1554,
            "h": 629,
            "alt": "Button variants: primary, secondary, tertiary, quaternary and Natasha (AI), in default, hover, focus and disabled states"
          },
          {
            "src": "/work/builder-design-system/ds/var-buttons.webp",
            "x": 0,
            "y": 1,
            "w": 292,
            "h": 536,
            "radius": 16,
            "alt": "Button component properties in Figma"
          }
        ]
      }
    ]
  },
  {
    "id": "130:4723",
    "side": "text",
    "items": [
      {
        "kind": "sub",
        "text": "Cards"
      },
      {
        "kind": "p",
        "text": "Cards in Builder Universe is most complex piece. Imagine a card that can take care of all products permutations. Quite challenging right? We did manage to crack it. I sat with team to collect all different cards from the products and gathered information being put on them and different micro components. Turned out that we can layout all those in one smartly and use them in all products efficiently as well."
      },
      {
        "kind": "pieces",
        "w": 1777,
        "h": 1202,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/image384.webp",
            "x": 0,
            "y": 0,
            "w": 253,
            "h": 1202,
            "radius": 16,
            "alt": "Base card component properties in Figma"
          },
          {
            "src": "/work/builder-design-system/ds/layout.webp",
            "x": 269,
            "y": 0,
            "w": 390,
            "h": 306,
            "alt": "Card layout"
          },
          {
            "src": "/work/builder-design-system/ds/atom.webp",
            "x": 675,
            "y": 0,
            "w": 508,
            "h": 572,
            "alt": "Card atom components"
          },
          {
            "src": "/work/builder-design-system/ds/basecard.webp",
            "x": 1199,
            "y": 0,
            "w": 578,
            "h": 606,
            "alt": "Base card"
          }
        ]
      }
    ]
  },
  {
    "id": "130:4740",
    "side": "text",
    "items": [
      {
        "kind": "sub",
        "text": "Side Nav"
      },
      {
        "kind": "p",
        "text": "Another pattern in any other Product is side Nav, We again collected all the different Navigations from all our products and find the patterns that are similar and created a scalable Side nav that can take care of a tool with 5 items to the Enterprise tool with complex 3 levels of breakdown of information just from side nav. It is debatable that personalised Nav can do better, but that needs to be data driven."
      },
      {
        "kind": "pieces",
        "w": 1745,
        "h": 632,
        "pieces": [
          {
            "src": "/work/builder-design-system/ds/side-atom.webp",
            "x": 0,
            "y": 0,
            "w": 778,
            "h": 553,
            "alt": "Sidebar atom components"
          },
          {
            "src": "/work/builder-design-system/ds/side-comp.webp",
            "x": 810,
            "y": 0,
            "w": 362,
            "h": 632,
            "alt": "Sidebar component"
          },
          {
            "src": "/work/builder-design-system/ds/side-states.webp",
            "x": 1204,
            "y": 0,
            "w": 541,
            "h": 456,
            "alt": "Sidebar interactive states"
          }
        ]
      }
    ]
  },
  {
    "id": "130:4756",
    "side": "text",
    "items": [
      {
        "kind": "h",
        "text": "Results Achieved:"
      },
      {
        "kind": "p",
        "text": "Design Systems are like a living organism in the complex and ever evolving. What I showed here is just few section of what goes into a complete system. A complete system contains the following:"
      },
      {
        "kind": "stickies",
        "tone": "outline",
        "notes": [
          {
            "title": "Documentation:",
            "text": "A shared space where you say when and how to use the design system."
          },
          {
            "title": "Visual Language:",
            "text": "Guide to what the brand feels like."
          },
          {
            "title": "Pattern Library:",
            "text": "Also called \"component library\" includes what you see in slides."
          },
          {
            "title": "Brand Guidelines:",
            "text": "Includes principles, tone and voice, writing style, and more."
          },
          {
            "title": "Evolving Design",
            "text": "Block DS 4.0 is a work in progress but that's how it's supposed to be."
          }
        ]
      }
    ]
  }
];
