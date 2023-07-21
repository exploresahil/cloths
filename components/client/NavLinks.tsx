type NavLinksProps = {
  title: string;
  pageLink: string;
  classTitle: string;
  onClick?: (selectedCategory: string) => void;
};

export default function NavLinks({
  title,
  pageLink,
  classTitle,
  onClick,
}: NavLinksProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(title); // Pass the selected category (title) to the onClick event handler
    }
  };

  return (
    <li>
      <a href={pageLink} className={classTitle} onClick={handleClick}>
        {title}
      </a>
    </li>
  );
}
