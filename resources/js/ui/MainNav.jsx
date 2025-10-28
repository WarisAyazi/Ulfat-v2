import { Link, usePage } from "@inertiajs/react";
import { HiBookOpen, HiOutlineHome, HiUserCircle } from "react-icons/hi2";
import { GoPersonAdd } from "react-icons/go";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { CgTime } from "react-icons/cg";
import styled, { css } from "styled-components";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import Dropdown from "@/Components/Dropdown";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const StyledNavLink = styled(Link)`
    ${(props) =>
        props.$active
            ? css`
                  display: flex;
                  align-items: center;
                  gap: 1.2rem;

                  font-size: 1.6rem;
                  font-weight: 500;
                  padding: 1.2rem 2.4rem;
                  transition: all 0.3s;
                  & svg {
                      width: 2.4rem;
                      height: 2.4rem;
                      color: var(--color-brand-600);
                      transition: all 0.5s;
                  }
                  color: var(--color-brand-600);
              `
            : css`
                  &:link,
                  &:visited {
                      display: flex;
                      align-items: center;
                      gap: 1.2rem;

                      font-size: 1.6rem;
                      font-weight: 500;
                      padding: 1.2rem 2.4rem;
                      transition: all 0.3s;
                      color: var(--color-grey-600);
                  }

                  /* This works because react-router places the active class on the active NavLink */

                  &:hover,
                  &:active,
                  &.active:link,
                  &.active:visited {
                      color: var(--color-grey-800);
                      background-color: var(--color-grey-50);
                      border-radius: var(--border-radius-sm);
                  }

                  & svg {
                      width: 2.4rem;
                      height: 2.4rem;
                      color: var(--color-grey-400);
                      transition: all 0.3s;
                  }

                  &:hover svg,
                  &:active svg,
                  &.active:link svg,
                  &.active:visited svg {
                      color: var(--color-brand-600);
                  }
              `}
`;

function MainNav() {
    const user = usePage().props.auth.user;

    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink href="/dashboard">
                        <HiOutlineHome />
                        <span>Dashboard</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink
                        href={route("new-student.create")}
                        $active={route().current("new-student.create")}
                    >
                        <GoPersonAdd />
                        <span>Add Student</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink
                        href="/students"
                        $active={route().current("/students")}
                    >
                        <PiStudentBold /> <span>Students</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink href="/teachers">
                        <GiTeacher /> <span>Teachers</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink href="/courses">
                        <HiBookOpen /> <span>Subject</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink href="/times">
                        <CgTime />
                        <span>Time</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink
                        href="/create-teacher"
                        $active={route().current("/students")}
                    >
                        <FaPersonCirclePlus />
                        <span>Add Teacher</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex gap-5 rounded-md">
                                    <HiUserCircle />
                                    <button
                                        type="button"
                                        className="focus:outline-none"
                                    >
                                        {user.name}
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href="profile-register">
                                    Register
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
