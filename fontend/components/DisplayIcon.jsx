import { icons } from '../utils/icons';

function DisplayIcon({ icon }) {
  switch (icon) {
    case 'Salary':
      return icons.salary;
    case 'Business':
      return icons.business;
    case 'Investment':
      return icons.investment;
    case 'Property':
      return icons.property;
    case 'trash':
      return icons.trash;
    case 'Side Hustle':
      return icons.sideHustle;
    default:
      return icons.default;
  }
}

export default DisplayIcon;
