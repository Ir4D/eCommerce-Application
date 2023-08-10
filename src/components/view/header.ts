const createCodeTemplate = (): string => {
  return `<header class="header">
      <nav>
        <ul class="nav nav--header list">
          <li class="nav-item header-logo logo">
            <a href="" class="nav-link link"
              ><img
                src="./images/Logo.png"
                alt="logo"
                class="logo-img"
                width="37"
                height="54"
              />
              <span class="logo-text">Organick</span></a
            >
          </li>
          <li class="nav-item">
            <a href="" class="nav-link"></a>
          </li>
          <li class="nav-item"><a href="" class="nav-link link"></a></li>
          <li class="nav-item"><a href="" class="nav-link link"></a></li>
          <li class="nav-item"><a href="" class="nav-link link"></a></li>
          <li class="nav-item"><a href="" class="nav-link link"></a></li>
          <li class="nav-item"><a href="" class="nav-link link"></a></li>
        </ul>
      </nav>
    </header>`;
};

export default function headerView(): string {
  return createCodeTemplate();
}
