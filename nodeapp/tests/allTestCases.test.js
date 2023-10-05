//adminGetUsers
const request = require("supertest");
const mongoose=require('mongoose')

require('../index')

// done 
describe("GET /restaurant/getAllUsers",(()=>{
  test("Week7_Day4_Admin_module_Get_Allusers_API_testing", async () => {
    const response = await request("http://localhost:8080").get(
      "/restaurant/getAllUsers"
    );
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("_id");
    expect(response.body.data[0]).toHaveProperty("email");
    expect(response.body.data[0]).toHaveProperty("phoneNo");
    expect(response.body.data[0]).toHaveProperty("role");
    expect(response.body.data[0]).toHaveProperty("orders");
  });
}))



//adminMenu
describe("GET /restaurant/getAllMenu", () => {
    test("Week8_Day1_Get all menu items", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/getAllMenu"
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body?.data[0]).toHaveProperty("_id");
      expect(response.body?.data[0]).toHaveProperty("status");
      expect(response.body?.data[0]).toHaveProperty("category");
      expect(response.body?.data[0]).toHaveProperty("status");
      expect(response.body?.data[0]).toHaveProperty("price");
    });
  });
  
  describe("POST /restaurant/addMenu", () => {
    test("Week8_Day1_Add menu items ", async () => {
      const payload = {
        name: "rasgulla",
        imgPath: "hello",
        subCategory: "veg",
        description: "sweet",
        category: "deserts",
        status: "available",
        price: 15,
      };
      const response = await request("http://localhost:8080")
        .post("/restaurant/addMenu")
        .send(payload);
  
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.message).toBe("menu item has been added successfully");
    });
  
    test("Week8_Day1_Invalid Add menu items", async () => {
      const invalidPayload = {
        imgPath: "hello",
        subCategory: "veg",
        description: "sweet",
        category: "deserts",
        status: "available",
        price: 15,
      };
      const response = await request("http://localhost:8080")
        .post("/restaurant/addMenu")
        .send(invalidPayload);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  
  //adminOrders

  describe("GET /restaurant/viewOrder", () => {
    test("Week8_Day2_Get_all_orders", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/viewOrder"
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("error");
      expect(response.body?.data[0]).toHaveProperty("_id");
      expect(response.body?.data[0]).toHaveProperty("menuItems");
      expect(response.body?.data[0]).toHaveProperty("customerId");
      expect(response.body?.data[0]).toHaveProperty("description");
      expect(response.body?.data[0]).toHaveProperty("totalPrice");
      expect(response.body?.data[0]).toHaveProperty("tableNo");
      expect(response.body?.data[0]).toHaveProperty("status");
    });
  });
  

  
  //adminPayments

  describe("GET /restaurant/getAllPayments", () => {
    test("Week8_Day3_get_all_payments", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/getAllPayments"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("all payment detail");
      expect(response.body).toHaveProperty("data");
      expect(response.body?.data[0]).toHaveProperty("_id");
      expect(response.body?.data[0]).toHaveProperty("paymentMode");
      expect(response.body?.data[0]).toHaveProperty("orderId");
      expect(response.body?.data[0]).toHaveProperty("customerId");
      expect(response.body?.data[0]).toHaveProperty("customerName");
      expect(response.body?.data[0]).toHaveProperty("paymentDesc");
      expect(response.body?.data[0]).toHaveProperty("totalPrice");
      expect(response.body?.data[0]).toHaveProperty("status");
    });
  });


  //adminTable

  describe("GET /restaurant/table", () => {
    test("Week8_Day4_Get_table_status", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/table"
      );
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("error");
      expect(response.body.message).toBe("all table details");
  
      expect(response.body?.data[0]).toHaveProperty("_id");
      expect(response.body?.data[0]).toHaveProperty("tableNo");
      expect(response.body?.data[0]).toHaveProperty("alloted");
      expect(response.body?.data[0]).toHaveProperty("isAvailable");
      expect(response.body?.data[0]).toHaveProperty("served");
    });
  });
  
  describe("POST /restaurant/addTable", () => {
    test("Week8_Day4_Add_table ", async () => {
      let payload = {
        tableNo: [5],
        alloted: true,
        isAvailable: false,
        served: true,
        booked:false
      };
      const response = await request("http://localhost:8080")
        .post("/restaurant/addTable")
        .send(payload);
  
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.message).toBe("table has been added successfully");
    });

});

describe("PUT /restaurant/table/editStatus", () => {
    test("Week8_Day4_Edit_table_status ", async () => {
      let payload = {
        _id: "651128431eed6f152b351299",
        isAvailable: false,
        alloted: true,
        served: false,
      };
      const response = await request("http://localhost:8080")
        .put("/restaurant/table/editStatus")
        .send(payload);
       expect(response.status).toBe(200);
       expect(response.body.error).toBeFalsy();
    });
  
    test("Week8_Day4_Invalid_Edit_table_status ", async () => {
      let invalidPayload = {
        alloted: true,
        served: false,
      };
      const response = await request("http://localhost:8080")
        .put("/restaurant/table/editStatus")
        .send(invalidPayload);
       expect(response.status).toBe(400);
       expect(response.body.error).toBeTruthy();
    });
  });


  //userCart

  describe("User module menu API testing", () => {
    test("Week9_Day1_Get_all_menu_items", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/getAllMenu"
      );
  
      expect(response.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty("name");
      expect(response.body.data[0]).toHaveProperty("category");
      expect(response.body.data[0]).toHaveProperty("status");
      expect(response.body.data[0]).toHaveProperty("price");
      expect(response.body).toHaveProperty("data");
    });
  
    test("Week9_Day1_Add_menu_items_to_cart", async () => {
      const response = await request("http://localhost:8080")
        .post("/user/cart")
        .send({
          menuItems: ["650bdbe69fc8efdad23da4b6", "650bdc179fc8efdad23da4b8"],
          customerId: "650aa662aafc84ac296a3a90",
          customerName: "satyam",
          description: "fourth cart",
          totalPrice: 170,
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBeFalsy();
      expect(response.body.message).toBe("cart has been added successfully");
    });
  });

  //userLogin

  describe("User module login API testing", () => {
    let payload = {
      email: undefined,
      password: "Vinutha@13",
    };
    test("Week7_Day4_User_Login", async () => {
      const response = await request("http://localhost:8080")
        .post("/user/login")
        .send(payload);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    //   expect(response.body.message).toBe("Login Successfully");
    //   expect(response.body).toHaveProperty("token");
    //   expect(response.body).toHaveProperty("role");
    //   expect(payload.email).toBe(response.body.email);
    });
  
    test("Week7_Day4_Invalid_User_Login", async () => {
      const response = await request("http://localhost:8080")
        .post("/user/login")
        .send({
          email: undefined,
          password: "abcd1234",
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
});


//userMenu

describe("User module menu API testing", () => {
    test("Week9_Day3_Get_all_menu_items", async () => {
      const response = await request("http://localhost:8080").get(
        "/restaurant/getAllMenu"
      );
      expect(response.status).toBe(200);
      expect(response.body.data[0]).toHaveProperty("name");
      expect(response.body.data[0]).toHaveProperty("category");
      expect(response.body.data[0]).toHaveProperty("status");
      expect(response.body.data[0]).toHaveProperty("price");
      expect(response.body).toHaveProperty("data"); // Ensure the response has a property called 'items'
    });
  });

//userOrder
describe("User module order API testing", () => {
    test("Week7_Day4_placing_an_order", async () => {
      let menuItems = [
        {
          _id: "6506e30c85c65a1805b5ccec",
          name: "puri",
          type: "veg",
          description: "indian dishes",
          price: 50,
        },
        {
          _id: "6506b4d65a70efae8194894b",
          name: "dosa",
          type: "veg",
          description: "south indian dishes",
          price: 60,
        },
      ];
      let payload = {
        menuItems,
        customerId: "6505f53745536b296318b023",
        description: "third order",
        totalPrice: 300,
        tableNo: 2,
        status: "placed",
      };
      const response = await request("http://localhost:8080")
        .post("/user/order")
        .send(payload);
      expect(response.status).toBe(200);
      // expect(response.body.data[18]).toHaveProperty("status");
    });
  });

  //userRegistration

describe("User module registration API testing", () => {
  test("Week9_Day4_Registering_the_user ", async () => {
    const response = await request("http://localhost:8080")
      .post("/user/register")
      .send({
        name: "abhishek",
        email: "abhishek.d@testyantra.com",
        phoneNo: "1234567890",
        password: "abcd1234",
        role: "user",
      });
    expect(response.body.message).toBe("email already exits");
    expect(response.status).toBe(400);

  });

  test("Week9_Day4_Edit_user_detail ", async () => {
    // let id = "6515f2e7aba87b8dbe334fe9"
    let id = undefined
    const response = await request("http://localhost:8080")
      .put(`/user/editUser/${id}`)
      .send({
        name: "abhishek",
        email: "abhishek.d@testyantra.com",
        phoneNo: "1234567890",
        password: "abcd1234",
        role: "user",
      });
    expect(response.status).toBe(500);
    // expect(response.body.message).toBe("User Profile has been updated successfully");
  });

  test("Week9_Day5_Get_user_profile_by_id", async () => {
    let id = undefined

    const response = await request("http://localhost:8080").get(
      `/user/getUser/${id}`
    );

    expect(response.status).toBe(500);
    // expect(response.body.data).toHaveProperty("name");
    // expect(response.body).toHaveProperty("data");
    // expect(response.body.data).toHaveProperty("orders");
    // expect(response.body.data).toHaveProperty("email");
    // expect(response.body.data).toHaveProperty("phoneNo");
    // expect(response.body.data).toHaveProperty("role");
  });
});



  

