import { PageWithHeader, TopNav, Button, Image, Box, Text } from 'bumbag';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const HeaderLink = styled.span`
  & > a {
    color: inherit;
    font-size: inherit;
    text-decoration: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledPageWithHeader = styled(PageWithHeader)`
  display: flex;
  flex-direction: column;
  & > .bb-PageWithHeaderContent {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    & > .bb-Box {
      flex-grow: 1;
    }
  }
`;

const routes = {
  teacher: {
    title: 'Учитель',
    paths: [
      { title: 'Мои курсы', route: '/teacher/my-courses' },
      { title: 'Мои ученики', route: '/teacher/my-students' },
    ],
  },
  student: {
    title: 'Ученик',
    paths: [
      { title: 'Мои курсы', route: '/student/my-courses' },
      { title: 'Выбрать курс', route: '/student/all-courses' },
    ],
  },
};

const withHeader = (props) => {
  const router = useRouter();
  let scope;
  try {
    scope = router.pathname.match(/\/(.*)\//)[1];
  } catch {}
  const inScope = Object.keys(routes).indexOf(scope) !== -1;
  return (
    <StyledPageWithHeader
      header={
        <TopNav selectedId={router.pathname}>
          <TopNav.Section>
            <TopNav.Item marginLeft="50px" marginRight="50px">
              <HeaderLink>
                <Link href="/">
                  <Image
                    src="https://promoshapka.com/upload/iblock/70e/70e41df7dbf7322e42170f5f1d5c83f2.png"
                    height="44px"
                  />
                </Link>
              </HeaderLink>
            </TopNav.Item>
            {inScope &&
              routes[scope].paths.map((item) => (
                <TopNav.Item navId={item.route}>
                  <HeaderLink>
                    <Link href={item.route}>{item.title}</Link>
                  </HeaderLink>
                </TopNav.Item>
              ))}
          </TopNav.Section>
          {inScope && (
            <TopNav.Section marginRight="major-2">
              <Box alignY="center">
                <Text.Block>
                  Вы вошли как{' '}
                  <Text fontWeight="bold">{routes[scope].title}</Text>
                </Text.Block>
              </Box>
            </TopNav.Section>
          )}
        </TopNav>
      }
      border="default"
    >
      {props.children}
    </StyledPageWithHeader>
  );
};
export default withHeader;
