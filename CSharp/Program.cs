using System;
using System.Collections.Generic;

if (args.Length != 1)
{
    Console.Error.WriteLine("Choose week 1-6 or self-test.");
    return 1;
}

if (args[0] == "self-test")
{
    SelfTest.Run();
    Console.WriteLine("C# examples passed.");
    return 0;
}

switch (args[0])
{
    case "1":
        Console.WriteLine(new ServiceRequest("R1", "Repair printer").Summary());
        break;
    case "2":
        var first = new Counter();
        var second = new Counter();
        first.Increment();
        Console.WriteLine($"First: {first.Value}; second: {second.Value}");
        break;
    case "3":
        var request = new ProtectedRequest();
        request.Close("Replaced toner");
        Console.WriteLine($"Closed: {request.IsClosed}; resolution: {request.Resolution}");
        break;
    case "4":
        PrintableRequest[] requests = [new MaintenanceRequest("M1"), new TechnologyRequest("T1")];
        foreach (var item in requests) Console.WriteLine(item.Summary());
        break;
    case "5":
        var notifier = new RecordingNotifier();
        new RequestService(notifier).Submit("R1");
        Console.WriteLine(notifier.Messages[0]);
        break;
    case "6":
        var created = RequestFactory.Create(" R1 ", " Repair printer ");
        Console.WriteLine(created.Summary());
        break;
    default:
        Console.Error.WriteLine("Choose week 1-6 or self-test.");
        return 1;
}

return 0;

public sealed record ServiceRequest(string Id, string Description)
{
    public string Summary() => $"{Id}: {Description} (open)";
}

public sealed class Counter
{
    public int Value { get; private set; }
    public void Increment() => Value++;
}

public sealed class ProtectedRequest
{
    public string? Resolution { get; private set; }
    public bool IsClosed => Resolution is not null;

    public void Close(string resolution)
    {
        if (IsClosed) throw new InvalidOperationException("Request is already closed.");
        if (string.IsNullOrWhiteSpace(resolution)) throw new ArgumentException("A resolution is required.");
        Resolution = resolution.Trim();
    }
}

public abstract class PrintableRequest(string id)
{
    protected string Id { get; } = id;
    public abstract string Summary();
}

public sealed class MaintenanceRequest(string id) : PrintableRequest(id)
{
    public override string Summary() => $"Request {Id}: maintenance";
}

public sealed class TechnologyRequest(string id) : PrintableRequest(id)
{
    public override string Summary() => $"Request {Id}: technology";
}

public interface INotifier
{
    void Notify(string message);
}

public sealed class RecordingNotifier : INotifier
{
    public List<string> Messages { get; } = [];
    public void Notify(string message) => Messages.Add(message);
}

public sealed class RequestService(INotifier notifier)
{
    public void Submit(string id)
    {
        if (string.IsNullOrWhiteSpace(id)) throw new ArgumentException("An ID is required.");
        notifier.Notify($"Submitted {id.Trim()}");
    }
}

public static class RequestFactory
{
    public static ServiceRequest Create(string id, string description)
    {
        if (string.IsNullOrWhiteSpace(id)) throw new ArgumentException("An ID is required.");
        if (string.IsNullOrWhiteSpace(description)) throw new ArgumentException("A description is required.");
        return new ServiceRequest(id.Trim(), description.Trim());
    }
}

public static class SelfTest
{
    public static void Run()
    {
        Check(new ServiceRequest("R1", "Printer").Summary() == "R1: Printer (open)");
        var first = new Counter();
        var second = new Counter();
        first.Increment();
        Check(first.Value == 1 && second.Value == 0);

        var request = new ProtectedRequest();
        Expect<ArgumentException>(() => request.Close(" "));
        Check(!request.IsClosed);
        request.Close(" fixed ");
        Check(request.IsClosed && request.Resolution == "fixed");
        Expect<InvalidOperationException>(() => request.Close("again"));

        PrintableRequest[] items = [new MaintenanceRequest("M"), new TechnologyRequest("T")];
        Check(items[0].Summary() == "Request M: maintenance");
        Check(items[1].Summary() == "Request T: technology");
        var notifier = new RecordingNotifier();
        var service = new RequestService(notifier);
        service.Submit(" R1 ");
        Check(notifier.Messages.Count == 1 && notifier.Messages[0] == "Submitted R1");
        Expect<ArgumentException>(() => service.Submit(" "));
        Check(RequestFactory.Create(" R1 ", " printer ").Summary() == "R1: printer (open)");
        Expect<ArgumentException>(() => RequestFactory.Create("R1", " "));
    }

    private static void Check(bool condition)
    {
        if (!condition) throw new InvalidOperationException("Self-test failed.");
    }

    private static void Expect<T>(Action action) where T : Exception
    {
        try { action(); }
        catch (T) { return; }
        throw new InvalidOperationException($"Expected {typeof(T).Name}.");
    }
}
