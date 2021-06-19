import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const placeHolderMenuItems = ["Profile","Save","Logout"];
const placeHolderLoggedOutMenuItems = ["Register","Save", "Login"];

export default function PlanMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function OpenProfilePopup() {

  }

  function SaveCurrentPlan() {

  }

  function OpenLoginPopup() {

  }

  function Logout() {

  }

  function OpenRegisterPopup() {
    
  }

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls="plan-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e: any) => handleClick(e)}
      >
        Dashboard
      </Button>
      <Menu
        id="plan-menu"
        aria-labelledby="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {placeHolderMenuItems.map((option:string) => (
          <MenuItem key={option}  onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}