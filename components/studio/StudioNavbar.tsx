const StudioNavbar = (props: any) => {
  return (
    <div>
      <>Studio Header</>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
