const Logo = (props: any) => {
  const { renderDefault, title } = props;
  return (
    <div>
      Image
      <>{renderDefault(props)}</>
    </div>
  );
};

export default Logo;
