# Modern ERP

React + Typescript + Tailwind + Lucide + DND + TipTap generated with bolt.new, then updated with Cursor composer.

## Used prompts in bolt.new

```
An ERP with React and Ant Design, witn modules : CRM, Project management, Quotation, Invoices, Time-tracking
```

```
Yes. Start with module CRM. It should manage the companies, the clients, and all the necessary data to build the invoices (location, company ID, website).
On the detailed page of a company, I should have shortcuts to get all the projects, quotations or invoices related to this company.
```

```
Yes. Implement the Project management module. Each project is related to a client of the CRM, and has a list of tasks. The tasks are displayed in a Kanban view.
Each task embeded a rich text editor to write what's going on about the task. A user can directly track the time spent on the task by adding a record to a list. This time record has a date, a comment and a time (in hours) spent on the task for this date.
```

```
Now build the Quotation module. It should manage a list of products or time-based services. A quotation is for a client. The module keep the different versions of the quotations sent to a client. I has a rich text editor to add a description of the proposal just before listing the products and the total price. The quotation includes a configurable VAT tax to calculate the total price. Each quotation can be exported as a PDF file.
```

