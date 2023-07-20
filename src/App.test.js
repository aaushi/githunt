import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom";
import { USER_DATA } from './mocks/userData';
import  {getUsersApi } from './services/getUsers';


//jest.mock("./services/getUsers");



test('user input textbox should be present', () => {
  render(<App />);
  const linkElement = screen.getByTestId("userNameInput");
  expect(linkElement).toBeInTheDocument();
});

test("user card should be present", () => {
  render(<App />);
  const userCard = screen.getByTestId("userCard");
  expect(userCard).toBeInTheDocument();
});

test("api testing", async () => {
  render(<App />);
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(USER_DATA),
  });
  const mockUserName = "aaushi";
  const result = await getUsersApi(mockUserName);
  console.log(result)

  expect(global.fetch).toHaveBeenCalledWith(
    "https://api.github.com/users/" + mockUserName
  );
  expect(result).toEqual(USER_DATA);

});

test("handles API error", async () => {
  const mockUserName = "invaliduser";
  const mockError = new Error("User not found");

  // Mock the fetch function and its response to simulate an error
  global.fetch = jest.fn().mockRejectedValueOnce(mockError);

  // Call the getUsersApi function with the mockUserName and use `.rejects` matcher
  await expect(getUsersApi(mockUserName)).rejects.toThrow(mockError);

  // Check if the fetch function is called with the correct URL
  expect(global.fetch).toHaveBeenCalledWith(
    "https://api.github.com/users/" + mockUserName
  );

  // Restore the fetch function to its original implementation
  global.fetch.mockRestore();
});
