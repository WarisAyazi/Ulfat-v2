import { Link } from "@inertiajs/react";
import {
    HiBookOpen,
    HiChevronDoubleUp,
    HiCircleStack,
    HiOutlineHome,
} from "react-icons/hi2";
import styled, { css } from "styled-components";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa6";
import NavLink from "@/Components/NavLink";

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
    return (
        <nav>
            <NavList>
                <li>
                    <StyledNavLink
                        href={route("dashboard")}
                        // active={true}
                        $active={route().current("dashboard")}
                    >
                        <HiOutlineHome />
                        <span>Dashboard</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink
                        href={route("new-student.create")}
                        $active={route().current("new-student.create")}
                    >
                        <FaUserPlus /> <span>Create Student</span>
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
                        <HiCircleStack /> <span>Time</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink
                        href="/create-teacher"
                        $active={route().current("/students")}
                    >
                        <HiChevronDoubleUp /> <span>Create Teacher</span>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
