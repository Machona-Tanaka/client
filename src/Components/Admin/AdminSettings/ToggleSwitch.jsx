const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;