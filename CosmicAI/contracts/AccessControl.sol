// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessControlManager is Ownable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    // Event emitted when a role is granted
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    // Event emitted when a role is revoked
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    // Function to grant a role to an account
    function grantRole(bytes32 role, address account) public onlyRole(getRoleAdmin(role)) {
        grantRole(role, account);
        emit RoleGranted(role, account, msg.sender);
    }

    // Function to revoke a role from an account
    function revokeRole(bytes32 role, address account) public onlyRole(getRoleAdmin(role)) {
        revokeRole(role, account);
        emit RoleRevoked(role, account, msg.sender);
    }

    // Function to check if an account has a specific role
    function hasRole(bytes32 role, address account) public view override returns (bool) {
        return super.hasRole(role, account);
    }

    // Function to set the admin role for a specific role
    function setRoleAdmin(bytes32 role, bytes32 adminRole) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setRoleAdmin(role, adminRole);
    }

    // Function to add a user to the USER_ROLE
    function addUser (address account) public onlyRole(ADMIN_ROLE) {
        grantRole(USER_ROLE, account);
    }

    // Function to remove a user from the USER_ROLE
    function removeUser (address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(USER_ROLE, account);
    }

    // Function to check if an account is a user
    function isUser (address account) public view returns (bool) {
        return hasRole(USER_ROLE, account);
    }

    // Function to get the admin role of a specific role
    function getAdminRole(bytes32 role) public view returns (bytes32) {
        return getRoleAdmin(role);
    }
}
