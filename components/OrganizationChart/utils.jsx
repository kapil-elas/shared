import * as d3 from 'd3';
import { FaBuilding } from "react-icons/fa";
export const appendHandler = (container, selector, attribute, callback) => {
  
  d3.select(container)
    .selectAll(selector)
    .on('click', function (event) {
      event.stopPropagation();
      const attributeValue = d3.select(this).attr(attribute);
      callback(attributeValue, event);
    });
};


export const getUserNameAndPosition = (data) => {
  if (data && data.users && data.users.length > 0 && data.position ) {
      return {
          name: data.users[0].full_name,
          positionName: data.position.name
      }
  }
  return {
    name: data.name,
  };
};

const getInitials = (name) => {
  return name ? name.charAt(0).toUpperCase() : '?';
};


export const getUserProfileIcon = (data) => {
  const user = data.users && data.users.length > 0 ? data.users[0] : undefined;
  if (!user) {
    return getDefaultBuildingIcon(data);
  }

  if (user.imageUrl) {
    return (
      <img data-id={user.id} key={user.id} className="node-img" src={user.imageUrl} alt={user.full_name || "Profile"}/>
    );
  }

  if (user.full_name) {
    return (
      <div className="node-img node-img-placeholder" style={{ backgroundColor: getRandomColor() }} data-id={user.id} key={user.id}>
        {getInitials(user.full_name)}
      </div>
    );
  }

  return getDefaultBuildingIcon(data);
}

const getDefaultBuildingIcon = (data) => {
  return (
    <div className="node-img node-img-placeholder" 
        style={{ backgroundColor: getRandomColor() }}
        data-id={data.department?.id}>
        <FaBuilding color='#ffffff' />
      </div>
  );
}

const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
  ];
  return colors[0];
  // return colors[Math.floor(Math.random() * colors.length)];
};
